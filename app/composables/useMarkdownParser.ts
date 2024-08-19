// composables/useMarkdownParser.ts
// Import package exports
import {
  createMarkdownParser,
  rehypeHighlight,
  createShikiHighlighter,
} from '@nuxtjs/mdc/runtime'
  // Import desired Shiki themes and languages
import GithubDark from 'shiki/themes/github-dark.mjs'
import GithubLight from 'shiki/themes/github-light.mjs'
import HtmlLang from 'shiki/langs/html.mjs'
import MdcLang from 'shiki/langs/mdc.mjs'
import TsLang from 'shiki/langs/typescript.mjs'
import VueLang from 'shiki/langs/vue.mjs'
import ScssLang from 'shiki/langs/scss.mjs'
import YamlLang from 'shiki/langs/yaml.mjs'
import GoLang from 'shiki/langs/go.mjs'
import KotlinLang from 'shiki/langs/kotlin.mjs'
import JavaLang from 'shiki/langs/java.mjs'
import JavascriptLang from 'shiki/langs/javascript.mjs'
import cppLang from 'shiki/langs/cpp.mjs'
import csharpLang from 'shiki/langs/csharp.mjs'
import bashLang from 'shiki/langs/bash.mjs'
import dockerLang from 'shiki/langs/docker.mjs'
import dockerfileLang from 'shiki/langs/dockerfile.mjs'
import pythonLang from 'shiki/langs/python.mjs'
import dartLang from 'shiki/langs/dart.mjs'
import cssLang from 'shiki/langs/css.mjs'

// ref: https://github.com/nuxt-modules/mdc?tab=readme-ov-file#usage
export default function useMarkdownParser() {
  let parser: Awaited<ReturnType<typeof createMarkdownParser>>

  const parse = async (markdown: string) => {
    if (!parser) {
      parser = await createMarkdownParser({
        rehype: {
          plugins: {
            highlight: {
              instance: rehypeHighlight,
              options: {
                // Pass in your desired theme(s)
                // theme: 'material-theme-palenight',
                theme: {
                  default: 'github-light',
                  dark: 'github-dark',
                },
                // Create the Shiki highlighter
                highlighter: createShikiHighlighter({
                  bundledThemes: {
                    'github-dark': GithubDark,
                    'github-light': GithubLight,
                  },
                  // Configure the bundled languages
                  bundledLangs: {
                    html: HtmlLang,
                    mdc: MdcLang,
                    vue: VueLang,
                    yml: YamlLang,
                    css: cssLang,
                    scss: ScssLang,
                    ts: TsLang,
                    typescript: TsLang,
                    go: GoLang,
                    golang: GoLang,
                    java: JavaLang,
                    js: JavascriptLang,
                    javascript: JavascriptLang,
                    kotlin: KotlinLang,
                    bash: bashLang,
                    cpp: cppLang,
                    csharp: csharpLang,
                    docker: dockerLang,
                    dockerfile: dockerfileLang,
                    py: pythonLang,
                    python: pythonLang,
                    dart: dartLang,
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
