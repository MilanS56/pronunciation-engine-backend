import whisper
import sys

print("Loading Whisper model...", flush=True)
model = whisper.load_model("tiny")   # USE tiny on Render
print("Whisper model loaded", flush=True)

audio = sys.argv[1]
result = model.transcribe(audio)

print(result["text"].strip(), flush=True)
