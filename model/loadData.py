import os
import json
import numpy as np
import cv2
import pickle

def draw_strokes(drawing):
    canvas = np.zeros((256, 256), dtype=np.uint8)
    for x, y in drawing:
        for i in range(1, len(x)):
            cv2.line(canvas, (x[i-1], y[i-1]), (x[i], y[i]), 255, 2)
    return cv2.resize(canvas, (128, 128), interpolation=cv2.INTER_AREA).astype("float32") / 255.0

def load_data(path, limit_per_class=7500):
    images = [] 
    labels = []

    for class_id, file in enumerate(f for f in os.listdir(path) if f.endswith('.ndjson')):
        class_images = []

        with open(os.path.join(path, file), 'r') as f:
            for i, line in enumerate(f):
                if i >= limit_per_class: break

                drawing = json.loads(line)["drawing"]
                class_images.append(draw_strokes(drawing))

        images.extend(class_images)
        labels.extend([class_id] * len(class_images))

    return np.array(images, dtype=np.float32), np.array(labels, dtype=np.float32).reshape(-1, 1)

images, labels = load_data('C:\\Users\\Luka\\AppData\\Local\\Google\\DrawDataset')
images = images.reshape(images.shape[0], -1)

with open("images_128x128", "wb") as f:
    pickle.dump(images, f)
with open("labels_128x128", "wb") as f:
    pickle.dump(labels, f)
