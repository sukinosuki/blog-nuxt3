// composables/useMarkdownParser.ts
// Import package exports
import {
  createMarkdownParser,
  rehypeHighlight,
  createShikiHighlighter,
} from '@nuxtjs/mdc/runtime'
  // Import desired Shiki themes and languages
import MaterialThemePalenight from 'shiki/themes/material-theme-palenight.mjs'
import GithubDarkDefault from 'shiki/themes/github-dark-default.mjs'
import HtmlLang from 'shiki/langs/html.mjs'
import MdcLang from 'shiki/langs/mdc.mjs'
import TsLang from 'shiki/langs/typescript.mjs'
import VueLang from 'shiki/langs/vue.mjs'
import ScssLang from 'shiki/langs/scss.mjs'
import YamlLang from 'shiki/langs/yaml.mjs'

export default function useMarkdownParser() {
  let parser: Awaited<ReturnType<typeof createMarkdownParser>>

  const parse = async (markdown: string) => {
    if (!parser) {
      parser = await createMarkdownParser({
        rehype: {
          plugins: {
            highlight: {
              instance: GithubDarkDefault,
              options: {
                // Pass in your desired theme(s)
                // theme: 'github-dark-default',
                themes: {
                  light: 'github-light-default',
                  dark: 'github-dark-default',
                },
                // Create the Shiki highlighter
                highlighter: createShikiHighlighter({
                  bundledThemes: {
                    'github-dark-default': GithubDarkDefault,
                  },
                  // Configure the bundled languages
                  bundledLangs: {
                    html: HtmlLang,
                    mdc: MdcLang,
                    vue: VueLang,
                    yml: YamlLang,
                    scss: ScssLang,
                    ts: TsLang,
                    typescript: TsLang,
                  },
                }),
              },
            },
          },
        },
      })
    }
    return parser(markdown)
  }

  return parse
}
