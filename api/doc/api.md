#Index

**Classes**

* [class: Linotype](#Linotype)
  * [new Linotype()](#new_Linotype)
  * [Linotype~defaults](#Linotype..defaults)
  * [linotype.initEventListeners()](#Linotype#initEventListeners)
    * [initEventListeners~getEventsPage(e)](#Linotype#initEventListeners..getEventsPage)
  * [linotype.init(options)](#Linotype#init)
  * [linotype.moveSectionUp(moveOptions)](#Linotype#moveSectionUp)
  * [linotype.moveSectionDown(moveOptions)](#Linotype#moveSectionDown)
  * [linotype.section(sectionIndex)](#Linotype#section)
  * [linotype.moveSection(options)](#Linotype#moveSection)
  * [linotype.config()](#Linotype#config)

**Events**

* [event: "resizeEventHandler"](#event_resizeEventHandler)
* [event: "keyboardEventHandler"](#event_keyboardEventHandler)
* [event: "mouseWheelHandler"](#event_mouseWheelHandler)
* [event: "touchStartHandler"](#event_touchStartHandler)
* [event: "touchMoveHandler"](#event_touchMoveHandler)
* [event: "emitTest"](#event_emitTest)

**Members**

* [options](#options)
 
<a name="Linotype"></a>
#class: Linotype
**Members**

* [class: Linotype](#Linotype)
  * [new Linotype()](#new_Linotype)
  * [Linotype~defaults](#Linotype..defaults)
  * [linotype.initEventListeners()](#Linotype#initEventListeners)
    * [initEventListeners~getEventsPage(e)](#Linotype#initEventListeners..getEventsPage)
  * [linotype.init(options)](#Linotype#init)
  * [linotype.moveSectionUp(moveOptions)](#Linotype#moveSectionUp)
  * [linotype.moveSectionDown(moveOptions)](#Linotype#moveSectionDown)
  * [linotype.section(sectionIndex)](#Linotype#section)
  * [linotype.moveSection(options)](#Linotype#moveSection)
  * [linotype.config()](#Linotype#config)

<a name="new_Linotype"></a>
##new Linotype()
A module that represents a Linotype object, a Linotyper is a page composition tool.

**Author**: Yaw Joseph Etse  
**License**: MIT  
**Copyright**: Copyright (c) 2014 Typesettin. All rights reserved.  
<a name="Linotype..defaults"></a>
##Linotype~defaults
module default configuration

**Scope**: inner member of [Linotype](#Linotype)  
<a name="Linotype#initEventListeners"></a>
##linotype.initEventListeners()
Sets up a new lintotype component.

<a name="Linotype#init"></a>
##linotype.init(options)
Sets up a new lintotype component.

**Params**

- options `object` - configuration options  

<a name="Linotype#moveSectionUp"></a>
##linotype.moveSectionUp(moveOptions)
Move Section up Shortcut.

**Params**

- moveOptions `object` - only move if there is not an internal element with a scroll  

<a name="Linotype#moveSectionDown"></a>
##linotype.moveSectionDown(moveOptions)
Move Section down Shortcut.

**Params**

- moveOptions `object` - only move if there is not an internal element with a scroll  

<a name="Linotype#section"></a>
##linotype.section(sectionIndex)
Move Section down Shortcut.

**Params**

- sectionIndex `number` - index of section ot jump to  

<a name="Linotype#moveSection"></a>
##linotype.moveSection(options)
Shift section

**Params**

- options `object` - move direction options  

<a name="Linotype#config"></a>
##linotype.config()
Returns current linotype config element.

**Returns**: `object` - - linotype instance configuration object  
<a name="event_resizeEventHandler"></a>
#event: "resizeEventHandler"
recalculate the window dimensions.

<a name="event_keyboardEventHandler"></a>
#event: "keyboardEventHandler"
handle keyboard arrow events.

**Params**

- e `object` - touch event object  

<a name="event_mouseWheelHandler"></a>
#event: "mouseWheelHandler"
handle mouse scroll wheel events.

**Params**

- e `object` - touch event object  

<a name="event_touchStartHandler"></a>
#event: "touchStartHandler"
handle touch start events

**Params**

- e `object` - touch event object  

<a name="event_touchMoveHandler"></a>
#event: "touchMoveHandler"
handle touch move events

**Params**

- e `object` - touch event object  

<a name="event_emitTest"></a>
#event: "emitTest"
sample event emitter test

**Params**

- options `object` - sample object to return  

**Returns**: `object` - @param options  
<a name="options"></a>
#options
extended default options

