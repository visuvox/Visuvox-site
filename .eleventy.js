const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  eleventyConfig.addFilter("date", (dateObj, format) => {
    return DateTime.fromJSDate(new Date(dateObj), { zone: "utc" }).toFormat(format || "dd MMMM yyyy");
  });

  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("gallery", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/gallery/*.md");
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
