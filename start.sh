#!/bin/bash
cd client && npm run dev &
client_pid=$!
cd scheduler && npm run dev &
scheduler_pid=$!
cd scraping-service && npm run dev &
scraping_pid=$!
(cd generation-service && source venv/Scripts/activate && fastapi dev main.py) &
generation_pid=$!

echo "Client PID: $client_pid"
echo "Scheduler Service PID: $scheduler_pid"
echo "Scraping Service PID: $scraping_pid"
echo "Generation Service PID: $generation_pid"
echo "All services started. Press Ctrl+C to stop."
# Trap to kill all on exit
trap "echo 'Shutting down...'; kill $client_pid $scheduler_pid $scraping_pid $generation_pid; exit" SIGINT SIGTERM

# Wait for all
wait $client_pid $scheduler_pid $scraping_pid $generation_pid
