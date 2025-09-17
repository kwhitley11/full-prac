from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.json_util import dumps
import random

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # allow React frontend

# connect to MongoDB
client = MongoClient("mongodb://localhost:27017/") # local MongoDB
db = client['mydatabase'] # my database name
items_collection = db['items']

if items_collection.count_documents({}) == 0:
    categories = ['Electronics', 'Books', 'Clothing', 'Toys']
    items_to_insert = []

    for i in range(1, 101):
        item = {
            'name': f'Item {i}',
            'description': f'This is the description for item {i}',
            'category': random.choice(categories),
            'price': round(random.uniform(10, 500), 2), 
            'in_stock': random.choice([True, False])
        }
        items_to_insert.append(item)

    items_collection.insert_many(items_to_insert)
    print('Inserted 100 items in MongoDB!')

@app.route('/api/hello')
def hello():
    return jsonify({"message": "Hello from Python backend!"})

@app.route('/api/items')
def get_items():
    items = list(items_collection.find({})) # query all documents
    
    for item in items:
        item['_id'] = str(item['_id'])
    return dumps(items) # bson --> JSON


if __name__ == "__main__":
    app.run(port=5000, debug=True)
