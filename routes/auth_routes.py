@auth_bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        conn = get_db_connection()
        cur = conn.cursor()
        
        # Buscar usuario por email
        cur.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
        user = cur.fetchone()
        
        if not user:
            return jsonify({"error": "Email o contraseña incorrectos"}), 401

        return jsonify({
            "message": "Login exitoso",
            "user": {
                "id": user[0],
                "name": user[1],
                "email": user[2],
                "role_id": user[4]
            }
        }), 200 