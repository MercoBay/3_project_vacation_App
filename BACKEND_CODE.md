# Código Backend

## Modelos
```python
# models/db_config.py
import psycopg2
from dotenv import load_dotenv
...

# models/countries.py
def add_country(name):
    ...

# models/likes.py
def add_like(user_id, vacation_id):
    ...
```

## Rutas
```python
# routes/auth_routes.py
@auth_bp.route('/login', methods=['POST'])
...

# routes/vacations_routes.py
@vacations_bp.route("/vacations", methods=["GET"])
...
``` 