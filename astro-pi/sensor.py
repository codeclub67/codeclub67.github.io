# Import the libraries
from sense_hat import SenseHat
from time import sleep
import math

# see https://gist.github.com/mathebox/e0805f72e7db3269ec22

def rgb_to_hsb(rgb):
    r = float(rgb[0])
    g = float(rgb[1])
    b = float(rgb[2])
    high = max(r, g, b)
    low = min(r, g, b)
    h, s, v = high, high, high
    d = high - low
    s = 0 if high == 0 else d/high
    if high == low:
        h = 0.0
    else:
        h = {
            r: (g - b) / d + (6 if g < b else 0),
            g: (b - r) / d + 2,
            b: (r - g) / d + 4,
        }[high]
        h /= 6

    return h,s,v/255


def hsb_to_rgb(h, s, v):
    i = math.floor(h*6)
    f = h*6 - i
    p = v * (1-s)
    q = v * (1-f*s)
    t = v * (1-(1-f)*s)

    r, g, b = [
        (v, t, p),
        (q, v, p),
        (p, v, t),
        (p, q, v),
        (t, p, v),
        (v, p, q),
    ][int(i%6)]

    return round(r*255), round(g*255), round(b*255)

def colour_shift(rgb,n):
    hsb = rgb_to_hsb(rgb)
    return hsb_to_rgb((hsb[0]+n)%1,hsb[1],hsb[2])

# Set up the Sense HAT
sense = SenseHat()
sense.set_rotation(270, False)

# Set up the colour sensor
sense.color.gain = 60 # Set the sensitivity of the sensor
sense.color.integration_cycles = 64 # The interval at which the reading will be taken

for i in range(28):
    rgb = sense.color # get the colour from the sensor
    degrees = sense.temperature
    shift = degrees/120
    
    # Add colour variables and image
    # Colour palette
    a = colour_shift((255, 255, 255), shift) # White
    b = colour_shift((105, 105, 105), shift) # DimGray
    c = colour_shift((0, 0, 0), shift) # Black
    d = colour_shift((100, 149, 237), shift) # CornflowerBlue
    e = colour_shift((0, 0, 205), shift) # MediumBlue
    f = colour_shift((25, 25, 112), shift) # MidnightBlue
    g = colour_shift((0, 191, 255), shift) # DeepSkyBlue
    h = colour_shift((0, 255, 255), shift) # Cyan
    j = colour_shift((143, 188, 143), shift) # DarkSeaGreen
    k = colour_shift((46, 139, 87), shift) # SeaGreen
    l = colour_shift((0, 255, 127), shift) # SpringGreen
    m = colour_shift((34, 139, 34), shift) # ForestGreen
    n = colour_shift((154, 205, 50), shift) # YellowGreen
    o = colour_shift((128, 128, 0), shift) # Olive
    p = colour_shift((240, 230, 140), shift) # Khaki
    q = colour_shift((255, 255, 0), shift) # Yellow
    r = colour_shift((184, 134, 11), shift) # DarkGoldenrod
    s = colour_shift((139, 69, 19), shift) # SaddleBrown
    t = colour_shift((255, 140, 0), shift) # DarkOrange
    u = colour_shift((178, 34, 34), shift) # Firebrick
    v = colour_shift((255, 0, 0), shift) # Red
    w = colour_shift((255, 192, 203), shift) # Pink
    y = colour_shift((255, 20, 147), shift) # DeepPink
    z = colour_shift((153, 50, 204), shift) # DarkOrchid
    
    image = [
q,	g,	q,	g,	q,	g,	q,	g,
g,	q,	g,	l,	l,	l,	g,	q,
q,	g,	l,	c,	l,	c,	l,	g,
g,	q,	l,	c,	l,	c,	l,	q,
q,	g,	q,	l,	l,	l,	q,	g,
g,	q,	g,	q,	l,	q,	g,	q,
q,	g,	l,	l,	l,	l,	l,	g,
g,	q,	g,	q,	l,	q,	g,	q
]

    # Display the image
    sense.set_pixels(image)
    sleep(1)

sense.clear()