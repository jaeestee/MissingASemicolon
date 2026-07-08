import json, urllib.request
payload = json.dumps({'category':'Math'}).encode()
req = urllib.request.Request('http://localhost:8000/turn', data=payload, headers={'Content-Type':'application/json'})
try:
    with urllib.request.urlopen(req) as response:
        print(response.read().decode())
except Exception as exc:
    print(type(exc).__name__, exc)
