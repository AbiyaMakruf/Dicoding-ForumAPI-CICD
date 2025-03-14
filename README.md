# Proyek Akhir: Menjadi Back-End Developer Expert dengan JavaScript
## Penilaian Proyek
Proyek ini berhasil mendapatkan bintang 3/5 pada submission dicoding course Menjadi Back-End Developer Expert dengan JavaScript.

![Penilaian Proyek](README/penilaian_proyek.png)

Kriteria tambahan yang saya kerjakan sehingga mendapatkan nilai terbaik:
1. 
2. 

Kriteria tambahan yang tidak saya kerjakan:
1. Menyelesaikan kriteria opsional menyukai komentar
2. Menyelesaikan kriteria opsional submission sebelumnya yaitu balasan komentar
3. Menerapkan functional test (Hapi server test) untuk resource thread dan comment
4. Menerapkan 100% Test Coverage
5. Menuliskan kode dengan bersih alias mematuhi style guide yang Anda tetapkan

# 📌 Forum API

Forum API adalah backend API untuk aplikasi forum yang memungkinkan pengguna untuk **membuat akun, login, membuat thread, mengomentari thread, serta menambahkan balasan pada komentar** dengan menerapkan **Clean Architecture** dan **Automation Testing** menggunakan **Jest**.

---

## ✨ **Fitur yang Tersedia**

✅ **User Management** (Registrasi, Login, Logout) ✅ **Thread Management** (Menambahkan, Melihat Thread) ✅ **Comment Management** (Menambahkan, Menghapus Komentar pada Thread) ✅ **Reply Management** (Menambahkan Balasan pada Komentar) ✅ **Authentication** (JWT Authentication) ✅ **Automation Testing** (Unit & Integration Testing dengan Jest) ✅ **Database Migration** (Menggunakan `node-pg-migrate`)

---

## 🚀 **Cara Menjalankan Proyek**

### 1️⃣ **Persiapan Database**

#### **📌 Cara Membuat User PostgreSQL**

1. Masuk ke PostgreSQL sebagai `postgres`:
   ```sh
   sudo -u postgres psql
   ```
2. Buat user baru:
   ```sql
   CREATE USER developer WITH PASSWORD 'supersecretpassword';
   ```
3. Beri hak akses superuser:
   ```sql
   ALTER USER developer WITH SUPERUSER;
   ```
4. Buat database untuk user:
   ```sql
   CREATE DATABASE developer OWNER developer;
   ```

#### **📌 Cara Membuat Database Forum API**

1. Masuk ke PostgreSQL sebagai `developer`:
   ```sh
   psql -U developer
   ```
2. Buat database:
   ```sql
   CREATE DATABASE forumapi;
   CREATE DATABASE forumapi_test;
   ```

### 2️⃣ **Menjalankan Migrasi Database**

1. **Membuat migrasi baru**:
   ```sh
   npm run migrate create "create table users"
   npm run migrate create "create table authentications"
   ```
2. **Menjalankan migrasi**:
   ```sh
   npm run migrate up
   npm run migrate:test up
   ```

### 3️⃣ **Menjalankan Server**

1. **Instal dependencies**:
   ```sh
   npm install
   ```
2. **Jalankan server**:
   ```sh
   npm run start
   ```

---

## 📌 **Struktur Proyek**

```bash
C:.
|   .env
|   .gitignore
|   package-lock.json
|   package.json
|   README.md
|   struktur_proyek.txt
|   
+---config
|   \---database
|           test.json
|                 
+---migrations
|       1627983516963_create-table-users.js
|       1627983555473_create-table-authentications.js
|       1740899905329_create-table-threads.js
|       1740900890574_create-table-comments.js
|       1740901570792_update-table-comments.js
|
+---postman
|       Forum API V1 Test.postman_collection.json
|       Forum API V1 Test.postman_environment.json
|
+---src
|   |   app.js
|   |   
|   +---Applications
|   |   +---security
|   |   \---use_case
|   |       |   AddCommentUseCase.js
|   |       |   AddThreadUseCase.js
|   |       |   DeleteCommentUseCase.js
|   |       |   GetThreadDetailsUseCase.js
|   |       |
|   +---Commons
|   |   \---exceptions
|   |
|   +---Domains
|   |   +---authentications
|   |   +---comments
|   |   +---threads
|   |   +---users
|   |
|   +---Infrastructures
|   |   |   container.js
|   |   +---database
|   |   +---http
|   |   \---repository
|   |
|   \---Interfaces
|       \---http
|           \---api
|               +---authentications
|               +---comments
|               +---threads
|               \---users
\---tests
        AuthenticationsTableTestHelper.js
        CommentsTableTestHelper.js
        ThreadsTableTestHelper.js
        UsersTableTestHelper.js
```

---

## 🔥 **Pengujian (Automation Testing dengan Jest)**

### ✅ **Menjalankan Seluruh Pengujian**

```sh
npm test -- --coverage
```

### ✅ **Menjalankan Pengujian Individual**

Misalnya, hanya ingin menguji `AddCommentUseCase.test.js`:

```sh
npm test -- Applications/use_case/_test/AddCommentUseCase.test.js
```

---

## 📮 **API Endpoint Documentation (Postman)**

Koleksi Postman tersedia di folder ``:

- **Import file berikut ke Postman**:
  - `Forum API V1 Test.postman_collection.json`
  - `Forum API V1 Test.postman_environment.json`

---

## 🛠 **Teknologi yang Digunakan**

- **Node.js** 🚀
- **Hapi.js** 🎯 (Framework backend)
- **PostgreSQL** 🗄️ (Database)
- **Jest** 🧪 (Unit & Integration Testing)
- **JWT** 🔐 (Authentication)
- **Node-PG-Migrate** 📦 (Migration Tool)

## Setup AWS Infrastructure for ForumAPI

### 1. Create Security Group
Create a security group named **ForumAPI** and modify the inbound rules to allow traffic on the following ports:
- **Port 3000**: Application access
- **Port 5000**: API access
- **Port 22**: SSH access

### 2. Create EC2 Instance
- Launch an EC2 instance using the security group **ForumAPI**.

### 3. Create RDS Instance
- Create an RDS instance with the following credentials:
  - **Username**: dicodingacademy
  - **Password**: supersecret

### 4. Access RDS from EC2
1. Install PostgreSQL client on EC2:
   ```sh
   sudo apt update && sudo apt install -y postgresql-client
   ```
2. Connect to RDS from EC2:
   ```sh
   psql --host=forumapi.cq7ztlpnmlve.ap-southeast-1.rds.amazonaws.com --username=dicodingacademy -d postgres
   ```
3. Create databases:
   ```sql
   CREATE DATABASE forumapi;
   CREATE DATABASE forumapi_test;
   ```

### 5. Install Node.js
1. Install Node.js and npm:
   ```sh
   curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo apt install npm
   ```

### 6. Install PM2
1. Install PM2 globally:
   ```sh
   sudo npm install pm2 -g
   ```

### 7. Clone Repository & Install Dependencies
1. Clone the project repository:
   ```sh
   git clone https://github.com/AbiyaMakruf/Dicoding-ForumAPI-CICD.git
   ```
2. Navigate to the project directory and install dependencies:
   ```sh
   cd Dicoding-ForumAPI-CICD
   npm install
   ```
3. Configure environment variables:
   ```sh
   nano .env  # Copy contents from .env.example
   ```
4. Update database configuration:
   ```sh
   nano config/database/test.json  # Copy contents from test.copy.json
   ```

### 8. Set Up DNS & SSL
1. Set hostname:
   ```sh
   curl -X POST -H "Content-type: application/json" -d '{ "ip": "13.212.247.22" }' "https://sub.dcdg.xyz/dns/records"
   ```
2. Install SSL certificate:
   ```sh
   sudo certbot --nginx -d rare-bars-rescue-slowly.a276.dcdg.xyz -d www.rare-bars-rescue-slowly.a276.dcdg.xyz
   ```

📌 **Selamat Coding!** 😃🔥

