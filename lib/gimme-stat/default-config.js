module.exports = {
    userAliases   : [
        'ilyamokin>Ilya Mokin',
        'imokin>Ilya Mokin'
    ],
    appendToMd    : false,
    since         : "3.months",
    until         : "",
    lmargin       : 19,
    barSize       : 60,
    cwd           : [ "." ],
    users         :'',
    //Masks of files which will ignored in your statistic
    statIgnore    : [
        /node_modules/mi,
        /package\-lock\.json/mi,
        /yarn\.lock/mi,
        /assets/mi,
        /dist/mi,
        /\.gitignore/,
        /www(\/|\\)build/mi,
        /^(\/|\\)www/mi,
        /\.idea/,
        /config\.xml/,
        /\.sourcemaps/,
        /.+\.map/
    ],

   
    daily: true,
    prepull: false,
    // The file extensions will be shown in your statistic,
    // other will be under 'other' category.
    statExtensions: [
        'js', 'html', 'htm', 'cs', 'css', 'scss', 'less', 'json', 'php', 'sql', 'py', 'net', 'c', 'java', 'ruby'
    ],

    //The users will be ignored for your statistic
    ignoreUsers : [
        'Unknown', 'user1'
    ]
}