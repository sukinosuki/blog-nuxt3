export default {

  get: (repos: string) => $fetch<Github.Repos>(`https://api.github.com/repos/${repos}`),
}
