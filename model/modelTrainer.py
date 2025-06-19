import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.utils import shuffle
from keras import utils
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
import tensorflow as tf


def prediction_model():

    num_of_classes = 25

    model = Sequential()
    model.add(Conv2D(32, (5, 5), input_shape=(128, 128,1), activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2), strides=(2, 2), padding='same'))
    model.add(Conv2D(64, (5, 5), activation='relu'))
    model.add(MaxPooling2D(pool_size=(2, 2), strides=(2, 2), padding='same'))

    model.add(Flatten())
    model.add(Dense(512, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(128, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(num_of_classes, activation='softmax'))

    model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

    return model


def load_data():
    with open("images_128x128", "rb") as f:
        images = np.array(pickle.load(f))
    with open("labels_128x128", "rb") as f:
        labels = np.array(pickle.load(f))

    return images, labels

def hot_encode_labels(labels):
    labels = utils.to_categorical(labels)
    return labels

def main():
    images, labels = load_data()
    images, labels = shuffle(images, labels)

    labels = hot_encode_labels(labels)

    train_images, test_images, train_labels, test_labels = train_test_split(images, labels,  test_size=0.15, random_state =0)

    train_images = train_images.reshape(train_images.shape[0], 128, 128, 1)
    test_images = test_images.reshape(test_images.shape[0], 128, 128, 1)

    model = prediction_model()
    model.summary()
    model.fit(train_images, train_labels, epochs=4, batch_size=64, validation_data=(test_images, test_labels))
    
    model.save("model.h5")

main()