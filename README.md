# 🎬 Movie Platform Management Application

A **Movie Platform Management Application** built with **Angular 19** (frontend) and **Django** (backend). This application allows users to manage a list of movies with details like Title, Video File, and Video Description.

## 🚀 Features
- 📌 **CRUD Operations**: Create, Read, Update, and Delete movies.
- 🎥 **Video Player**: Watch uploaded movies directly from the platform.
- 🎨 **Modern UI**: Beautifully designed Angular Material frontend.
- 🔄 **Dynamic Updates**: Newly added movies appear without reloading.

## 🛠️ Technologies Used
### Frontend (Angular 19)
- Angular Material
- Axios for HTTP requests
- Responsive design with CSS

### Backend (Django)
- Django REST Framework (DRF) for API
- File upload support for movies

## ⚡ Installation Guide

### 🔹 Backend (Django)
1. Install Python and Virtual Environment:
   ```console
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
   
2. Install Django REST Framework
  ```console
  pip install django djangorestframework django-cors-headers
  ```
3. Run Migrations
 ```console
  python manage.py migrate
  ```
4. Start Django Backend:
  ```console
  python manage.py runserver
  ```
### 🔹 Frontend (Angular)
1. Install Node.js and Angular CLI:
   ```console
   npm install -g @angular/cli
   ```
2. Install Axios:
  ```console
  npm install axios
  ```
3. Start Angular Development Server:
  ```console
  ng serve
  ```  

### API ENDPOINTS
Method	Endpoint	Description
GET	/api/movies/	Get all movies
POST	/api/movies/	Add a new movie
GET	/api/movies/:id/	Get a specific movie
PUT	/api/movies/:id/	Update a movie
DELETE	/api/movies/:id/	Delete a movie










