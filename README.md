# jquery.respondjsevents
A JQuery plugin to poll Respond.js DOM updates and fire an event when Respond.js has applied psuedo CSS3 media queries

Why use this plugin?
======

When using the plugin Respond.js (https://github.com/scottjehl/Respond) to apply CSS3 media queries on older browsers such as IE8 you may want to know when your styles have been applied and Respond.js currently doesn't have a way of notifying you. You can hack the plugin to fire an event but you may not be able to edit the code or you may just wish to use a solution which does not involve changing plugin logic.

How does it work?
======

The RespondJsEvents plugin polls a page for changes applied by Respond.js and then dispatches an event which you can listen for and act accordingly.

Usage Instructions
======

1. You need to specify your supported view modes, these relate directly to your CSS3 media queries. For example if you have the following CSS:

<pre>
    @media screen and (min-width: 1px){
        ...mobile styles go here
    }
    
    @media screen and (min-width: 481px){
        ...tablet styles go here
    }
    
    @media screen and (min-width: 1025px){
        ...desktop styles go here
    }
</pre>
