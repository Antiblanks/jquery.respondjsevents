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

1. Include the RespondJsEvents plugin by adding the following to the head of you page:

<pre>
    &lt;script type="text/javascript" src="../path/to/jquery-respondjsevents.js"&gt;
</pre>

2. Next you need to specify your supported view modes, these relate directly to your CSS3 media queries. You do this by adding some markup to the end of your page just before the closing blody tag. For example if you have the following CSS:

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

...then you have three supported view modes: mmobile, tablet & desktop so you would add the following markup to you page:

<pre>
    &lt;div id="respond-js-events"&gt;
        &lt;div class="respond-js-view-mode" data-view-mode="mobile"&gt;&lt;/div&gt;
        &lt;div class="respond-js-view-mode" data-view-mode="tablet"&gt;&lt;/div&gt;
        &lt;div class="respond-js-view-mode" data-view-mode="desktop"&gt;&lt;/div&gt;
    &lt;/div>
</pre>
