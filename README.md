# Internal-project-RING-SIZER
#RING SIZER 
import matplotlib.pyplot as plt
import numpy as np

# Constants for ring sizes and circle dimensions
RING_SIZES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']
CIRCLE_CENTER = (0, 0)
CIRCLE_RADIUS = np.linspace(0.1, 0.5, len(RING_SIZES))

# Create a blank plot
fig, ax = plt.subplots()

# Loop through ring sizes and plot circles with corresponding text
for i, size in enumerate(RING_SIZES):
    # Draw circle
    circle = plt.Circle(CIRCLE_CENTER, CIRCLE_RADIUS[i], fill=False, edgecolor='black', lw=2)
    ax.add_patch(circle)
    # Draw text inside the circle
    ax.text(*CIRCLE_CENTER, size, ha='center', va='center', fontsize=12)

# Set plot axis limits and aspect ratio
ax.set_xlim([-0.6, 0.6])
ax.set_ylim([-0.6, 0.6])
ax.set_aspect('equal', adjustable='box')

# Hide plot axis ticks and labels
ax.set_xticks([])
ax.set_yticks([])
ax.set_xticklabels([])
ax.set_yticklabels([])

# Save the plot as a PDF
plt.savefig("ring_sizer.pdf", dpi=300)
plt.close()
