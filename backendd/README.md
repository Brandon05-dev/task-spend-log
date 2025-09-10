# Expense Tracker Django Backend

A complete Django REST API for managing project expenses with PDF and Excel statement generation.

## Features

- **Project Management**: Create, read, update, and delete projects
- **Expense Tracking**: Add and manage expenses for each project
- **Statement Generation**: Generate PDF and Excel statements for projects
- **Admin Panel**: Full-featured Django admin for managing data
- **API Documentation**: RESTful API with clear endpoints
- **Data Validation**: Comprehensive validation for all inputs

## Project Structure

```
backendd/
├── manage.py                 # Django management script
├── expense_tracker/          # Main project settings
│   ├── __init__.py
│   ├── settings.py          # Django settings with DRF config
│   ├── urls.py              # Main URL routing
│   ├── wsgi.py              # WSGI configuration
│   └── asgi.py              # ASGI configuration
└── projects/                 # Main app
    ├── __init__.py
    ├── admin.py             # Enhanced admin configuration
    ├── apps.py              # App configuration
    ├── models.py            # Project and Expense models
    ├── serializers.py       # DRF serializers
    ├── views.py             # API viewsets with statement generation
    ├── urls.py              # App URL patterns
    ├── tests.py             # Unit tests
    └── migrations/          # Database migrations
```

## Models

### Project Model
- `id`: Auto-generated primary key
- `name`: Project name (required, max 200 chars)
- `description`: Project description (optional)
- `created_at`: Auto-generated timestamp
- `total_expenses`: Calculated property
- `expense_count`: Calculated property

### Expense Model
- `id`: Auto-generated primary key
- `project`: Foreign key to Project
- `amount`: Decimal field (must be > 0)
- `description`: Expense description (required, max 500 chars)
- `date`: Date of expense (defaults to today)
- `created_at`: Auto-generated timestamp

## API Endpoints

### Projects
- `GET /api/projects/` - List all projects with summary
- `POST /api/projects/` - Create a new project
- `GET /api/projects/{id}/` - Get project details with all expenses
- `PUT /api/projects/{id}/` - Update project
- `DELETE /api/projects/{id}/` - Delete project
- `GET /api/projects/{id}/statement/` - Generate PDF statement
- `GET /api/projects/{id}/statement/?format=excel` - Generate Excel statement

### Expenses
- `GET /api/expenses/` - List all expenses
- `POST /api/expenses/` - Create a new expense
- `GET /api/expenses/{id}/` - Get expense details
- `PUT /api/expenses/{id}/` - Update expense
- `DELETE /api/expenses/{id}/` - Delete expense
- `GET /api/expenses/?project={project_id}` - Filter expenses by project

## Installation & Setup

### 1. Prerequisites
- Python 3.8+
- Virtual environment (recommended)

### 2. Install Dependencies
```bash
# Navigate to backend directory
cd backendd

# Install required packages (already installed if you used the setup script)
pip install django djangorestframework reportlab openpyxl django-cors-headers
```

### 3. Database Setup
```bash
# Create and apply migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser for admin access
python manage.py createsuperuser
```

### 4. Run the Server
```bash
# Start development server
python manage.py runserver

# Server will start at http://127.0.0.1:8000/
```

## Usage

### Admin Panel
- Access at: `http://127.0.0.1:8000/admin/`
- Login with superuser credentials
- Manage projects and expenses through the enhanced admin interface

### API Usage Examples

#### Create a Project
```bash
curl -X POST http://127.0.0.1:8000/api/projects/ \
  -H "Content-Type: application/json" \
  -d '{"name": "Website Redesign", "description": "Complete website overhaul project"}'
```

#### Add an Expense
```bash
curl -X POST http://127.0.0.1:8000/api/expenses/ \
  -H "Content-Type: application/json" \
  -d '{"project": 1, "amount": 250.00, "description": "Domain registration", "date": "2025-09-10"}'
```

#### Get Project with Expenses
```bash
curl http://127.0.0.1:8000/api/projects/1/
```

#### Generate PDF Statement
```bash
curl http://127.0.0.1:8000/api/projects/1/statement/ -o statement.pdf
```

#### Generate Excel Statement
```bash
curl "http://127.0.0.1:8000/api/projects/1/statement/?format=excel" -o statement.xlsx
```

## Statement Generation

### PDF Features
- Professional layout using ReportLab
- Project information summary
- Detailed expense table with alternating row colors
- Automatic currency formatting
- Responsive design for different page sizes

### Excel Features
- Structured worksheet with project info
- Formatted expense table
- Currency formatting for amounts
- Professional styling with headers and colors
- Auto-adjusted column widths

## Data Validation

### Project Validation
- Name is required and cannot be empty
- Description is optional
- Automatic timestamp generation

### Expense Validation
- Amount must be greater than 0
- Description is required and cannot be empty
- Date defaults to current date
- Project reference is required

## Development Notes

### Key Features Implemented
- ✅ Django + DRF setup
- ✅ SQLite database
- ✅ Model validation
- ✅ Comprehensive serializers
- ✅ ViewSets with custom actions
- ✅ PDF generation with ReportLab
- ✅ Excel generation with openpyxl
- ✅ Enhanced admin panel
- ✅ CORS support for frontend integration
- ✅ Clear URL routing
- ✅ Detailed documentation

### Security Considerations
- CORS is currently set to allow all origins for development
- For production, update CORS settings in `settings.py`
- Add proper authentication/authorization as needed
- Update SECRET_KEY for production use

### Performance Optimizations
- QuerySet optimization in admin
- Prefetch related objects to reduce database queries
- Pagination enabled for API responses

## Testing

Run the included tests:
```bash
python manage.py test
```

## Deployment Considerations

For production deployment:
1. Set `DEBUG = False` in settings.py
2. Configure proper ALLOWED_HOSTS
3. Use environment variables for sensitive settings
4. Set up proper database (PostgreSQL recommended)
5. Configure static file serving
6. Add proper authentication middleware
7. Update CORS settings for specific origins

## Troubleshooting

### Common Issues
1. **Import errors**: Ensure all dependencies are installed
2. **Migration errors**: Run `python manage.py makemigrations` then `python manage.py migrate`
3. **Permission errors**: Ensure proper file permissions on database file
4. **CORS errors**: Check CORS settings in settings.py

### Support
- Check Django documentation: https://docs.djangoproject.com/
- DRF documentation: https://www.django-rest-framework.org/
- ReportLab documentation: https://www.reportlab.com/docs/
- openpyxl documentation: https://openpyxl.readthedocs.io/

## Credentials

**Admin User:**
- Username: `admin`
- Email: `admin@example.com`
- Password: `admin123`

**Database:** SQLite file located at `backendd/db.sqlite3`

The backend is now ready to use and can be immediately tested with any HTTP client or integrated with a frontend application!
