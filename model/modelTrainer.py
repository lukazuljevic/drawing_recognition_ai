import numpy as np
import pickle

def load_data():
    with open("images", "rb") as f:
        images = np.array(pickle.load(f))
    with open("labels", "rb") as f:
        labels = np.array(pickle.load(f))

    return images, labels

def main():
    images, labels = load_data()
    
#num_of_classes = 84 #moze se minjat