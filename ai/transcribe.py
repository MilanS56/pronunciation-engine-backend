import whisper
import sys
import warnings
warnings.filterwarnings("ignore")
model = whisper.load_model("base")

audio = sys.argv[1]
result = model.transcribe(audio)

# print ONLY the text (no logs)
print(result["text"].strip(), flush=True)
