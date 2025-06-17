import numpy as np
import os 
import pickle

def load_data():
    path = 'C:\\Users\\Luka\\AppData\\Local\\Google\\DrawDataset'
    files = os.listdir(path)

    all_images = []
    all_labels = []

    id = 0
    for file in files:
        if file.endswith('.npy'):
            file_path = os.path.join(path, file)
            try:
                image_data = np.load(file_path, allow_pickle=True)[:20000]
                image_data = image_data.astype("float32") / 255.0

                label_data = [id] * len(image_data)

                all_images.extend(image_data)  
                all_labels.extend(label_data)  

                print(f"Loaded {file} as class {id}")
                id += 1
            except Exception as e:
                print(f"Error loading {file}: {e}")

    images = np.array(all_images, dtype="float32") 
    labels = np.array(all_labels, dtype="int32")   

    return images, labels

images, labels = load_data()

# Save to pickle
with open("images", "wb") as f:
    pickle.dump(images, f)

with open("labels", "wb") as f:
    pickle.dump(labels, f)
