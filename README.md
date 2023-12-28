# ReadComp

A human readable compression algorithm running realtime locally behind a pretty user interface

## Introduction

ReadComp originally came from a need for a study sheet in a university course, where one single sided a4 paper sheet was permitted, and was required to be hand-written. Since this course was mainly pure memorization, most of the course could be written down. However, manually choosing which words to abbreviate and when would prove to be a pointless task, resulting in few savings (Humans can't see into the future of what will be written), so thus the solution is to pre-write and then compress. I figured that if we are pre-writing we might as well automate the compression. Thus ReadComp was born. Unlike some other human readable compression algorithms such as [Humanzip](https://www.gsp.com/cgi-bin/man.cgi?section=1&topic=humanzip), which focus on readability, without too much file size reduction, ReadComp aims to strike a balance between readability and compression. And since how "readable" something is is a subjective matter the user has complete control over the compression settings, including the frequency of compression, the length of the abbreviation, and the requirements of a word to be compressed.

### Privacy

As someone who cared deeply about online privacy an application dealing with anything written by me must protect the data extremely well. This is the reason that ReadComp runs entirely from the browsers and is build without any web frameworks, only vanilla HTML, CSS & JS. ReadComp doesn't store any text locally, nor does it ever make any network connections outside of the downloading of the page's source files to your browser. This also has the side effect of allowing ReadComp to run entirely offline should your browser have cached the page.

## Working on ReadComp

First clone the repository, then edit as you wish, it's quite simple.

To edit documentation ReadComp has created a custom [Pandoc](https://pandoc.org/) template, to compile the documentation page using Pandoc run the following commands: 
_From root directory_
`cd ./pages`
`pandoc ../README.md -o read-more.html --template=pandoc-template.html`

## The Algorithm

### Overview

Our algorithm analysis the text you submit and applies compression via abbreviation according to your chosen settings. ReadComp aims to introduce progressively smarter compression as development continues. 

### Step 1

The first thing that ReadComp does with your text is remove any apostrophes `'`, capital letters, or other characters that are not directly required in the grammar. For the purpose of retaining grammatical sense ReadComp allows common punctuation, including question marks `?`, commas `,`, etc. ReadComp does not retain special characters that some text editors may generate such as special quotation marks.

### Step 2

ReadComp now splits your text into an array via spaces, then it makes a new [`set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) from that array.

### Step 3

Now we will count the occurrence of each word into a new object of words and their count.

### Step 4

Using the object containing words and their count we will now now check each word against the users's specified conditions, adding the word to a `set` called `wordsToEdit`, and adding it's abbreviation to a `set` `abrWords`. We add it's abbreviation `set` so we can easily avoid cases such as `runnable` being shortened to `run` while `run` as a word is already used in the document.

### Step 5 

Now we can go through the text and replace each word in `wordsToEdit` in the text with it's abbreviation.