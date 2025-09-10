# Expense Tracker Frontend

This is a React frontend application for managing projects and expenses, designed to work with a Django REST Framework backend. The application allows users to create and manage projects, add expenses, and generate PDF and Excel statements for each project.

## Features

- Create and manage projects
- Add and list expenses for each project
- Download PDF and Excel statements for projects
- User-friendly interface with loading indicators and modals

## Technologies Used

- React
- Axios for API requests
- CSS for styling
- React Router for navigation

## Project Structure

```
expense-tracker-frontend
├── public
│   ├── index.html
│   └── favicon.ico
├── src
│   ├── components
│   │   ├── common
│   │   │   ├── Header.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── Modal.jsx
│   │   ├── expenses
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   └── ExpenseItem.jsx
│   │   └── projects
│   │       ├── ProjectForm.jsx
│   │       ├── ProjectList.jsx
│   │       ├── ProjectItem.jsx
│   │       └── ProjectDetail.jsx
│   ├── services
│   │   ├── api.js
│   │   ├── projectService.js
│   │   └── expenseService.js
│   ├── hooks
│   │   ├── useApi.js
│   │   └── useProjects.js
│   ├── pages
│   │   ├── Dashboard.jsx
│   │   ├── Projects.jsx
│   │   └── ProjectDetail.jsx
│   ├── utils
│   │   ├── formatters.js
│   │   └── constants.js
│   ├── styles
│   │   ├── globals.css
│   │   ├── components.css
│   │   └── variables.css
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd expense-tracker-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## API Integration

The frontend communicates with the Django REST Framework backend hosted at `http://127.0.0.1:8000/api`. Ensure that the backend is running before using the frontend application.

## Usage

- Navigate to the dashboard to view an overview of projects and expenses.
- Use the Projects page to create new projects and view existing ones.
- Click on a project to view its details, add expenses, and download statements.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.