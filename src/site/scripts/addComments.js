function addComments() {
    // Build the script tag to insert to the main body text
    var commentsScript = document.createElement('script');
    commentsScript.type = 'text/javascript';
    commentsScript.src = 'https://utteranc.es/client.js';
    commentsScript.setAttribute('repo', "jx2lee-digitalgarden")
    commentsScript.setAttribute('issue-term', 'title')
    commentsScript.setAttribute('theme', 'github-light')
    commentsScript.setAttribute('crossorigin', 'anonymous')
    commentsScript.setAttribute("async", "");
    document.getElementsByClassName('markdown-preview-view')[0].appendChild(commentsScript);
}