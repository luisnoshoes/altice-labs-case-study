docker build -t altice-labs-case-study .
docker run -dp 4200:80 altice-labs-case-study

Read-Host -Prompt "Container started. Press any key to close the terminal"