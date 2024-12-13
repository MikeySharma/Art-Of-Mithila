import tensorflow as tf

# Load the Keras model
model = tf.keras.models.load_model("art-classification-custom-dataset-c4-v14-1.h5")

# Save the model in TensorFlow SavedModel format
model.save("saved_model", save_format="tf")
