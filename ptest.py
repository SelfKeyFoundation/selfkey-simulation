import sys
import json

number = sys.argv[1]
print(json.dumps({"message": "checked", "num" : number}))