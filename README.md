# jquery.respondjsevents
A JQuery plugin to poll Respond.js DOM updates and fire an event when Respond.js has applied psuedo CSS3 media queries

Why use this plugin?
======

When using the plugin Respond.js (https://github.com/scottjehl/Respond) to apply CSS3 media queries on older browsers such as IE8 you may want to know when your styles have been applied and Respond.js currently doesn't have a way of notifying you. You can hack the plugin to fire an event but you may not be able to edit the code or you may just wish to use a solution which does not involve changing plugin logic.

How does it work?
======

The RespondJsEvents plugin polls a page for changes applied by Respond.js and then dispatches an event which you can listen for and act accordingly. 'Polling' sounds expensive but RespondJsEvents does not put unnecessary strain on the browser and you can configure the polling by adjusting the pollingIterationsMax options property in the plugin options. Note: The plugin will poll every 250 millaseconds and the default pollingIterationsMax value is 20 which is a 5 second poll duration, I would advise not going much lower than this as you must allow Respond.js enough time to load your stylesheet and apply your styles. 

Usage Instructions
======

1. Include the RespondJsEvents plugin and CSS by adding the following to the head of you page:

<pre>
    &lt;script type="text/javascript" src="../path/to/jquery-respondjsevents.js"&gt;
    &lt;link type="text/css" rel="stylesheet" href="../path/to/jquery-respondjsevents.css"&gt;
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

...then you have three supported view modes: mobile, tablet & desktop so you would add the following markup to you page:

<pre>
    &lt;div id="respond-js-events"&gt;
        &lt;div class="respond-js-view-mode" data-view-mode="mobile"&gt;&lt;/div&gt;
        &lt;div class="respond-js-view-mode" data-view-mode="tablet"&gt;&lt;/div&gt;
        &lt;div class="respond-js-view-mode" data-view-mode="desktop"&gt;&lt;/div&gt;
    &lt;/div>
</pre>

3. Next you will need to edit the jquery-respondjsevents.css file to make RespondJsEvents CSS3 media queries match your existing CSS3 media queries. There is more info on this inside the jquery-respondjsevents.css file.

4. Finally you will need to listen to the event that the RespondJsEvents plugin dispatches and do whatever it is you want to do once the styles have been applied, do this by adding this line to your Javascript:

<pre>
    $("#respond-js-events").on("respondJsEvents.onRespondJsUpdateComplete", function() {
        ...do whatever it is you want to do
    });
</pre>

5. And thats it, now when Respond.js applies the styles from the relevant media query the associated .respond-js-view-mode tag will be shown and the plugin will dispatch an event. 
