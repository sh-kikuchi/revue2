---
title: Firebase
description: key-value型データベース
category: flutter
createdAt: 2021-09-09
updatedAt: 2021-09-09
sortNumber: 011
path: "/articles/flutter/011_googlefont"
---

<nuxt-content-wrapper>

- [1. はじめに](#1-はじめに)
- [2. Cloud Firestoreの準備](#2-cloud-firestoreの準備)
    - [■ NoSQLドキュメント指向データベース](#-nosqlドキュメント指向データベース)
    - [■ 設定](#-設定)
- [3. main.dart](#3-maindart)
- [4. todo.dart](#4-tododart)
- [5. CRUD](#5-crud)
    - [■ READ](#-read)
    - [■ CREATE](#-create)
    - [■  UPDATE](#--update)
    - [■ DELETE](#-delete)
- [8. おわりに](#8-おわりに)

<br>

# 1. はじめに


<br>

# 2. Cloud Firestoreの準備
- Cloud FirestoreとはNoSQLのクラウドデータベースのことを指す。

### ■ NoSQLドキュメント指向データベース
- Cloud FirestoreとはNoSQLのクラウドデータベースのことを指す。特徴はRDBMSと違ってテーブルや行を持たず、KVS(Key-Value Store)の形式を取っており、スキーマレスなデータ管理が実現できる。

- 【コレクション】ー【ドキュメント】ー【フィールド】
  ```
  todo ←コレクション
    ├─8wz9Dbup93aamhcHn4az　←ドキュメントID
    |   └─ {content:"testtest",todo:"flutter3"}　←フィールド
    |
    ├─UoZrHzCdNxe184uNlBvw
        └─ {content:"testtest",todo:"flutter3"}
  ```

- コレクションまたはドキュメントのいずれかが存在しない場合は、Cloud Firestore によって自動で生成される。

- スキーマレス（各ドキュメントにどのフィールドを入れるかやそのフィールドにどのデータ型を格納するかを、完全に自由に決めることができます）




### ■ 設定
- pubspec.yamlに追加する
  ```yaml
  dependencies:
  flutter:
    sdk: flutter

  cloud_firestore: ^3.4.6
  ```

<br>

# 3. main.dart
<details>
<summary>全コード</summary>

```dart
  import 'package:flutter/material.dart';
  import 'package:firebase_core/firebase_core.dart';
  import 'package:fire_project/todo.dart';

  Future<void> main() async {
    WidgetsFlutterBinding.ensureInitialized();
    await Firebase.initializeApp();
    runApp(const MyApp());
  }

  class MyApp extends StatelessWidget {
    const MyApp({super.key});
    @override
    Widget build(BuildContext context) {
      return const MaterialApp(
        title: 'Fire Project',
        home: ToDoPage(),
      );
    }
  }
```

</details>

<br>

# 4. todo.dart
<details>
<summary>全コード</summary>

```dart
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class ToDoPage extends StatefulWidget {
  @override
  _ToDoPageState createState() => _ToDoPageState();
}

class _ToDoPageState extends State<ToDoPage> {
  final TextEditingController _todoController = TextEditingController();
  final TextEditingController _contentController = TextEditingController();

  final CollectionReference _todos =
      FirebaseFirestore.instance.collection('todo');

  /*
  * 【メソッド】アップサート
  * documentSnapshot（firebaseのデータ）がある場合、更新。ない場合は削除
  * */
  Future<void> _add_or_update([DocumentSnapshot? documentSnapshot]) async {
    String mode = 'addition';
    if (documentSnapshot != null) {
      mode = 'update';
      _todoController.text = documentSnapshot['todo'];
      _contentController.text = documentSnapshot['content'].toString();
    }

    // print(widget.user);

    await showModalBottomSheet(
        isScrollControlled: true,
        context: context,
        builder: (BuildContext ctx) {
          return Padding(
            padding: EdgeInsets.only(
                top: 20,
                left: 20,
                right: 20,
                // prevent the soft keyboard from covering text fields
                bottom: MediaQuery.of(ctx).viewInsets.bottom + 20),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                TextField(
                  controller: _todoController,
                  decoration: const InputDecoration(labelText: 'ToDo'),
                ),
                TextField(
                  keyboardType:
                      const TextInputType.numberWithOptions(decimal: true),
                  controller: _contentController,
                  decoration: const InputDecoration(
                    labelText: 'Content',
                  ),
                ),
                const SizedBox(
                  height: 20,
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.red,
                  ),
                  onPressed: () async {
                    final String todo = _todoController.text;
                    final String content = _contentController.text;
                    // Addiing process
                    if (todo != null && content != null) {
                      if (mode == 'addition') {
                        // Persist a new product to Firestore
                        await _todos.add({"todo": todo, "content": content});

                        // Show the snack bar for the add
                        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
                            backgroundColor: Colors.red,
                            content: Text(
                              'Added ${todo}!',
                              style: const TextStyle(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 15,
                                  color: Colors.white),
                            )));
                      }
                      // Editing process
                      if (mode == 'update') {
                        // Update the product
                        await _todos
                            .doc(documentSnapshot!.id)
                            .update({"todo": todo, "content": content});

                        // Show the snack bar for the edit
                        ScaffoldMessenger.of(context)
                            .showSnackBar(const SnackBar(
                                backgroundColor: Colors.red,
                                content: Text(
                                  'Updated Content!',
                                  style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 15,
                                      color: Colors.white,
                                      backgroundColor: Colors.yellowAccent),
                                )));
                      }
                      // Clear the text fields
                      _todoController.text = '';
                      _contentController.text = '';

                      // Hide the bottom sheet
                      Navigator.of(context).pop();
                    }
                  },
                  child: Text(mode == 'addition' ? 'Add' : 'Update'),
                )
              ],
            ),
          );
        });
  }

  /*
  * 【メソッド】削除機能
  * */
  Future<void> _deleteProduct(String productId) async {
    await _todos.doc(productId).delete();

    // Show the snack bar for the exclusion
    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
        backgroundColor: Colors.red,
        content: Text(
          'Deleted Content!',
          style: TextStyle(
              fontWeight: FontWeight.bold, fontSize: 15, color: Colors.black),
        )));
  }
  /*
  * 画面表示用ヴィジェット
  * */
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: Text('Fire Project_${widget.user.email as String}'),
          backgroundColor: Colors.red,
        ),
        // StreamBuilder to pass Firestore values to ListView.builder
        body: StreamBuilder(
          stream: _todos.snapshots(),
          builder: (context, AsyncSnapshot<QuerySnapshot> streamSnapshot) {
            if (streamSnapshot.hasData) {
              // Display FireStore values in list format
              return ListView.builder(
                itemCount: streamSnapshot.data!.docs.length,
                itemBuilder: (context, index) {
                  final DocumentSnapshot documentSnapshot =
                      streamSnapshot.data!.docs[index];
                  // View documents in the card widget
                  return Card(
                    margin: const EdgeInsets.all(10),
                    child: ListTile(
                      title: Text(documentSnapshot['todo']), // ToDo
                      subtitle: Text(
                          documentSnapshot['content'].toString()), // Content
                      trailing: SizedBox(
                        width: 100,
                        child: Row(
                          children: [
                            // Edit Button
                            IconButton(
                                color: Colors.red,
                                icon: const Icon(Icons.edit),
                                onPressed: () =>
                                    _add_or_update(documentSnapshot)),
                            // Delete Button
                            IconButton(
                                color: Colors.red,
                                icon: const Icon(Icons.delete),
                                onPressed: () =>
                                    _deleteProduct(documentSnapshot.id)),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              );
            }
            return const Center(
              child: CircularProgressIndicator(),
            );
          },
        ),
        // Add Button
        floatingActionButton: FloatingActionButton(
          backgroundColor: Colors.red,
          onPressed: () => _add_or_update(),
          child: const Icon(Icons.add),
        ),
      ),
    );
  }
}
```
</details>

<br>

# 5. CRUD
- Firestoreでtodoというコレクションのデータを`CollectionReference`型の_todosという変数に格納している。

### ■ READ
```dart
  final CollectionReference _todos =
      FirebaseFirestore.instance.collection('todo');
```

<br>

### ■ CREATE
```dart
  _todos.add({"todo": todo, "content": content});
```
<br>

### ■  UPDATE
```dart
  _todos
    .doc(documentSnapshot!.id)
    .update({"todo": todo, "content": content});
```
<br>

### ■ DELETE
```dart
  Future<void> _deleteProduct(String productId) async {
    await _todos.doc(productId).delete();
  }
```

<br>

# 8. おわりに

参考(最終閲覧日:2023/09/09)
- [Flutter×Firebase QuerySnapshot、DocumentSnapshotとは](https://zenn.dev/hikaru24/articles/0dd3b1071672c8)
- [Cloud Firestore にデータを追加する](https://firebase.google.com/docs/firestore/manage-data/add-data?hl=ja)



</nuxt-content-wrapper>
