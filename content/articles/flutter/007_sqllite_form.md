---
title: フォームづくり-SQLite篇-
description: ダイアリーを作ってみよう。
category: flutter
createdAt: 2021-07-30
updatedAt: 2021-07-30
sortNumber: 007
path: "/articles/flutter/007_sqllite_form"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. 新規作成・更新用ダイアログ](#2-新規作成更新用ダイアログ)
    - [■ DBデータを取得し、表示する用の変数を用意](#-dbデータを取得し表示する用の変数を用意)
    - [■ DBからデータを取得し、リストに格納](#-dbからデータを取得しリストに格納)
    - [■ TextFieldに初期値を設定する](#-textfieldに初期値を設定する)
- [3. 新規作成・更新用ダイアログ](#3-新規作成更新用ダイアログ)
- [4. データベースの処理を呼び出す。](#4-データベースの処理を呼び出す)
- [5. データを表示するUI部分](#5-データを表示するui部分)
- [6 全文](#6-全文)
- [7. おわりに](#7-おわりに)

<br>

# 1. はじめに
`main.dart`で初期画面に`journal_form.dart`を表示させているという前提で、フォーム作りをしてみる。SQLiteのCRUDをこのUI画面で使っていく。

```
プロジェクトディレクトリ
│
│── lib
│   │──main
│      │── sql_helper.dart
│      │── main.dart
│      │── journal_form.dart
│
```

<br>

# 2. 新規作成・更新用ダイアログ
### ■ DBデータを取得し、表示する用の変数を用意
DBからのデータを表示するためのリストを用意
```dart
  List<Map<String, dynamic>> _journals = [];
```
<br>

### ■ DBからデータを取得し、リストに格納
`SQLHelper.getJournals();`は前記事を参照。
```dart
  void _refreshJournals() async {
    final data = await SQLHelper.getJournals();
    setState(() {
      _journals = data;
    });
  }
```

<br>

### ■ TextFieldに初期値を設定する
```dart
final TextEditingController _titleController = TextEditingController();
final TextEditingController _descriptionController = TextEditingController();
final TextEditingController _dateController = TextEditingController();
```

<br>

# 3. 新規作成・更新用ダイアログ
_showFormを作成する。

```dart
void _showForm(int? id) async {
    if (id != null) {
      final existingJournal =
      _journals.firstWhere((element) => element['id'] == id);
      _titleController.text = existingJournal['title'];
      _dateController.text = existingJournal['date'];
      _descriptionController.text = existingJournal['description'];
    }

    showModalBottomSheet(
        context: context,
        elevation: 5,
        isScrollControlled: true,
        builder: (_) => Container(
              padding: EdgeInsets.only(
                top: 15,
                left: 15,
                right: 15,
                // this will prevent the soft keyboard from covering the text fields
                bottom: MediaQuery.of(context).viewInsets.bottom + 120,
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  TextField(
                    controller: _titleController,
                    decoration: const InputDecoration(hintText: 'Title'),
                  ),
                  TextField(
                    controller: _dateController,
                    decoration: const InputDecoration(hintText: 'date'),
                  ),
                  IconButton(
                      onPressed: () {
                        _selectDate(context);
                      },
                      icon: const Icon(Icons.calendar_today)),
                  const SizedBox(
                    height: 10,
                  ),
                  TextField(
                    controller: _descriptionController,
                    decoration: const InputDecoration(hintText: 'Description'),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  ElevatedButton(
                    onPressed: () async {
                      if (id == null) {
                        await _addItem();
                      }

                      if (id != null) {
                        await _updateItem(id);
                      }

                      _titleController.text = '';
                      _descriptionController.text = '';

                      Navigator.of(context).pop();
                    },
                    child: Text(id == null ? '新規作成' : '更新'),
                  )
                ],
              ),
            ));
  }
```

<br>

# 4. データベースの処理を呼び出す。
追加処理、更新処理、削除処理をSQLHelperのメソッドで行うために必要なパラメータを送る。
さきほど作った`_refreshJournals();`で処理後の状態を更新している。`floatingActionButton`

```dart
  Future<void> _addItem() async {
    await SQLHelper.createItem(_titleController.text, _dateController.text,
       _descriptionController.text);
    _refreshJournals();
  }

  Future<void> _updateItem(int id) async {
    await SQLHelper.updateItem(id, _titleController.text, _dateController.text,
        _descriptionController.text);
    _refreshJournals();
  }

  void _deleteItem(int id) async {
    await SQLHelper.deleteItem(id);
    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
      content: Text('データを削除しました'),
    ));
    _refreshJournals();
  }
```

# 5. データを表示するUI部分
`_showForm(_journals[index]['カラム名'])`でデータを表示する。データの数だけリスト表示している。`の部分でダイアログを表示する。floatingActionButton`の部分でダイアログを表示する。

```dart
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Journals'),
      ),
      body: _isLoading
          ? const Center(
              child: CircularProgressIndicator(),
            )
          : ListView.builder(
              itemCount: _journals.length,
              itemBuilder: (context, index) => Card(
                color: Colors.orange[200],
                margin: const EdgeInsets.all(15),
                child: ListTile(
                    title: Text(_journals[index]['title']),
                    subtitle: Text(_journals[index]['description']),
                    trailing: SizedBox(
                      width: 100,
                      child: Row(
                        children: [
                          IconButton(
                            icon: const Icon(Icons.edit),
                            onPressed: () => _showForm(_journals[index]['id']),
                          ),
                          IconButton(
                            icon: const Icon(Icons.delete),
                            onPressed: () =>
                                _deleteItem(_journals[index]['id']),
                          ),
                        ],
                      ),
                    )),
              ),
            ),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.catching_pokemon),
        onPressed: () => _showForm(null),
      ),
    );
  }
```

<br>

# 6 全文
<details>

```dart
// main.dart
import 'package:flutter/material.dart';
import 'sql_helper.dart';
import 'main.dart';

class JournalForm extends StatelessWidget {
  const JournalForm({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        // Remove the debug banner
        debugShowCheckedModeBanner: false,
        title: 'Journals',
        theme: ThemeData(
          primarySwatch: Colors.orange,
        ),
        home: const HomePage());
  }
}

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  // All journals
  List<Map<String, dynamic>> _journals = [];

  bool _isLoading = true;
  // This function is used to fetch all data from the database
  void _refreshJournals() async {
    final data = await SQLHelper.getJournals();
    setState(() {
      _journals = data;
      _isLoading = false;
    });
  }

  @override
  void initState() {
    super.initState();
    _refreshJournals(); // Loading the diary when the app starts
  }

  DateTime? _selectedDate;
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  final TextEditingController _dateController = TextEditingController();

  void _showForm(int? id) async {
    if (id != null) {
      final existingJournal =
          _journals.firstWhere((element) => element['id'] == id);
      _titleController.text = existingJournal['title'];
      _dateController.text = existingJournal['date'];
      _descriptionController.text = existingJournal['description'];
    }

    showModalBottomSheet(
        context: context,
        elevation: 5,
        isScrollControlled: true,
        builder: (_) => Container(
              padding: EdgeInsets.only(
                top: 15,
                left: 15,
                right: 15,
                // this will prevent the soft keyboard from covering the text fields
                bottom: MediaQuery.of(context).viewInsets.bottom + 120,
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  TextField(
                    controller: _titleController,
                    decoration: const InputDecoration(hintText: 'Title'),
                  ),
                  // const SizedBox(
                  //   height: 10,
                  // ),
                  TextField(
                    controller: _dateController,
                    decoration: const InputDecoration(hintText: 'date'),
                  ),
                  IconButton(
                      onPressed: () {
                        _selectDate(context);
                      },
                      icon: const Icon(Icons.calendar_today)),
                  const SizedBox(
                    height: 10,
                  ),
                  TextField(
                    controller: _descriptionController,
                    decoration: const InputDecoration(hintText: 'Description'),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  ElevatedButton(
                    onPressed: () async {
                      // Save new journal
                      if (id == null) {
                        await _addItem();
                      }

                      if (id != null) {
                        await _updateItem(id);
                      }

                      _titleController.text = '';
                      _descriptionController.text = '';

                      Navigator.of(context).pop();
                    },
                    child: Text(id == null ? 'Create New' : 'Update'),
                  )
                ],
              ),
            ));
  }

  //datePicker
  _selectDate(BuildContext context) async {
    final newSelectedDate = await showDatePicker(
      context: context,
      initialDate: _selectedDate ?? DateTime.now(),
      firstDate: DateTime(2000),
      lastDate: DateTime(2040),
    );

    if (newSelectedDate != null) {
      _selectedDate = newSelectedDate;
      _dateController.text = _selectedDate.toString();
    }
  }

  //database
  Future<void> _addItem() async {
    await SQLHelper.createItem(_titleController.text, _dateController.text,
        _descriptionController.text);
    _refreshJournals();
  }

  Future<void> _updateItem(int id) async {
    await SQLHelper.updateItem(id, _titleController.text, _dateController.text,
         _descriptionController.text);
    _refreshJournals();
  }

  // Delete an item
  void _deleteItem(int id) async {
    await SQLHelper.deleteItem(id);
    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
      content: Text('Successfully deleted a journal!'),
    ));
    _refreshJournals();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Journals'),
      ),
      body: _isLoading
          ? const Center(
              child: CircularProgressIndicator(),
            )
          : ListView.builder(
              itemCount: _journals.length,
              itemBuilder: (context, index) => Card(
                color: Colors.orange[200],
                margin: const EdgeInsets.all(15),
                child: ListTile(
                    title: Text(_journals[index]['title']),
                    subtitle: Text(_journals[index]['description']),
                    trailing: SizedBox(
                      width: 100,
                      child: Row(
                        children: [
                          IconButton(
                            icon: const Icon(Icons.edit),
                            onPressed: () => _showForm(_journals[index]['id']),
                          ),
                          IconButton(
                            icon: const Icon(Icons.delete),
                            onPressed: () =>
                                _deleteItem(_journals[index]['id']),
                          ),
                        ],
                      ),
                    )),
              ),
            ),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.catching_pokemon),
        onPressed: () => _showForm(null),
      ),
    );
  }
}
```
</details>

<br>

# 7. おわりに
地味にDatePickerで日付選択できるようにしていて、そこの説明ないけど。どっかで切り出しておくか。でも今回は以下のURLに結構依存している。もう少しアレンジしよう。というかこの技術を使って、アプリを作りたいものだ。

[Flutter & SQLite: CRUD Example](https://www.kindacode.com/article/flutter-sqlite/)

</nuxt-content-wrapper>
