import numpy as np
import os 
import pickle

files = os.listdir('C:\\Users\\Luka\\AppData\\Local\\Google\\DrawDataset')

def load_data():
    id = 0
    image_data = []
    label_data = []

    images = []
    labels = []

    for file in files:
        if file.endswith('.npy'):
            file = 'C:\\Users\\Luka\\AppData\\Local\\Google\\DrawDataset\\' + file 
            image_data = np.load(file, allow_pickle=True)[:80000]
            image_data = image_data.astype("float32") / 255.0
            image_data = image_data[0:10000, :]
            images.append(image_data)

            print(f"Loaded {file} with shape {image_data.shape}")

            label_data = [id for _ in range(10000)]
            id += 1

            label_data = np.array(label_data).astype("float32")
            label_data = label_data.reshape(label_data.shape[0], 1)
            labels.append(label_data)

    return images, labels

images, labels = load_data()


        






load_data()

