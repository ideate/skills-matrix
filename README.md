# skills-matrix
Skills Matrix

## Directories
/bin
/fonts
/src
/test

# Ensure mongo is running

## Run in separate terminal, or in background

mongod --smallfiles


curl http://localhost:8080/api/skills -H "Content-Type: application/json" --data '{"name": "skill1"}'