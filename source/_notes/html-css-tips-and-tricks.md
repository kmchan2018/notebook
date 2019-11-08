---
title: HTML/CSS Tips and Tricks
category: Programming
tag: [ 'Programming', 'Web', 'HTML', 'CSS' ]
---
Below are some tips and tricks for HTML5 and CSS development.

# Scrollbar Induced Element Drifting

Centered HTML elements can drift horizontally due to appearance and 
disapperance of vertical scrollbar. It can be solved by the following:

1. `vw` on the body tag gives the viewport width __including__ the scrollbar.
2. `100%` on the body tag gives the document width __excluding__ the scrollbar.
3. Hence, their difference, ie `calc(100vw - 100%)`, yields the scrollbar width.

For example, the following will add a left margin to the document equal to the width of
vertical scrollbar (none when scrollbar does not exist):

~~~css
html {
  margin-left: calc(100vw - 100%);
}
~~~

The idea came from [this Stack Overflow question](https://stackoverflow.com/questions/1417934/how-to-prevent-scrollbar-from-repositioning-web-page). 

