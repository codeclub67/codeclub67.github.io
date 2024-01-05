from turtle import * 
from math import *

def equilateral_triangleL(side):
  for i in range(3):
    forward(side)
    left(360/3)

def equilateral_triangleR(side):
  for i in range(3):
    forward(side)
    right(360/3)
    
def right_angle_equal_sides1(a):
  penup()
  forward(a)
  pendown()
  left(90)
  forward(a)
  left(180-45)
  forward(a*sqrt(2))
  
def right_angle_equal_sides2(a):
  forward(a*sqrt(2))
  left(180-45)
  forward(a)
  left(90)

def equilateral90(side):
  right(90)
  right_angle_equal_sides1(100)
  left(90)
  right_angle_equal_sides2(100)

def right_angle(a,b):
  forward(a)
  left(90)
  forward(b)
  left(180-degrees(atan(a/b)))
  forward(sqrt(a**2 + b**2))
  
right_angle(100,170)
