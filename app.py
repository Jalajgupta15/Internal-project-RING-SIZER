import streamlit as st
import numpy as np

# Title of the application
st.title("Ring Sizer")

# Set background image
st.markdown("<style>body {background-image: url('https://t4.ftcdn.net/jpg/09/68/87/07/240_F_968870732_lT3Jl5riJlv04zDhtLOld586HIX11wmG.jpg'); background-size: cover;}</style>", unsafe_allow_html=True)

# Sidebar for navigation
st.sidebar.title("Navigation")
option = st.sidebar.selectbox("Choose an option:", ["Ring Size Detection", "Finger Circumference to Ring Size Conversion", "History"])

# Initialize session state for storing history
if 'ring_history' not in st.session_state:
    st.session_state.ring_history = []

# Function to detect ring size
def detect_ring_size(diameter):
    # Updated mapping of diameter to ring size (in US sizes)
    size_map = {
        15.7: 5, 16.5: 6, 17.3: 7, 18.2: 8,
        19.0: 9, 19.8: 10, 20.6: 11, 
        21.4: 12, 22.2: 13, 23.0: 14, 
        23.8: 15
    }
    closest_size = min(size_map.keys(), key=lambda x: abs(x - diameter))
    return size_map[closest_size]

# Ring Size Detection Tab
if option == "Ring Size Detection":
    st.header("Detect Your Ring Size")
    
    # User input for diameter adjustment
    diameter = st.slider("Adjust the diameter (mm):", min_value=14.0, max_value=24.0, value=17.0, step=0.1)
    
    # Display the adjusted diameter
    st.write(f"Adjusted Diameter: {diameter:.1f} mm")
    
    # Draw the circle
    circle_radius = diameter / 2
    st.markdown(f"""
        <div style="width: {diameter}mm; height: {diameter}mm; border-radius: 50%; 
        background-color: rgba(255, 255, 255, 0.5); margin: auto; display: flex; 
        justify-content: center; align-items: center;">
            <p style="color: black;">Place your ring here</p>
        </div>
    """, unsafe_allow_html=True)
    
    # Determine ring size
    ring_size = detect_ring_size(diameter)
    st.success(f"Your estimated ring size is: US Size {ring_size}")
    
    # Save to history
    if st.button("Save this size"):
        st.session_state.ring_history.append((diameter, ring_size))
        st.success("Size saved to history!")

# Finger Circumference Conversion Tab
elif option == "Finger Circumference to Ring Size Conversion":
    st.header("Convert Finger Circumference to Ring Size")
    
    circumference = st.number_input("Enter your finger circumference (mm):", min_value=40, max_value=100)
    
    # Simple conversion logic (example)
    if circumference < 50:
        suggested_size = 5
    elif circumference < 55:
        suggested_size = 6
    elif circumference < 60:
        suggested_size = 7
    elif circumference < 65:
        suggested_size = 8
    elif circumference < 70:
        suggested_size = 9
    elif circumference < 75:
        suggested_size = 10
    elif circumference < 80:
        suggested_size = 11
    elif circumference < 85:
        suggested_size = 12
    elif circumference < 90:
        suggested_size = 13
    elif circumference < 95:
        suggested_size = 14
    else:
        suggested_size = 15
    
    if st.button("Get Suggested Ring Size"):
        st.success(f"Suggested Ring Size: US Size {suggested_size}")

# History Tab
elif option == "History":
    st.header("Saved Ring Sizes")
    
    if not st.session_state.ring_history:
        st.write("No sizes saved yet.")
    else:
        for idx, (diameter, size) in enumerate(st.session_state.ring_history):
            st.write(f"{idx + 1}. Diameter: {diameter:.1f} mm - Ring Size: US Size {size}")

# Footer with tips and seasonal themes toggle
st.sidebar.header("Tips & Seasonal Themes")
seasonal_theme = st.sidebar.selectbox("Choose a theme:", ["Default", "Festive", "Spring", "Summer"])
if seasonal_theme == "Festive":
    st.markdown("<style>body {background-color: #ffcccb;}</style>", unsafe_allow_html=True)
elif seasonal_theme == "Spring":
    st.markdown("<style>body {background-color: #e6ffe6;}</style>", unsafe_allow_html=True)
elif seasonal_theme == "Summer":
    st.markdown("<style>body {background-color: #ffffe6;}</style>", unsafe_allow_html=True)

st.sidebar.write("Remember to take care of your rings! Avoid exposure to harsh chemicals.")
