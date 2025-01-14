import { extname } from 'path'
import { parseId, generateImports } from './imports'

function importPlugin (_options = {}){

    const options = {
        sfc: false,
        ..._options
    }

    return {
        name: 'primevue:import',
        configResolved (config) {
            if (config.plugins.indexOf(this) < config.plugins.findIndex(plugin => plugin.name === 'vite:vue')) {
                throw new Error('PrimeVue plugin must be loaded after the vue plugin')
            }
        },
        async transform (code, id) {
            const { query, path } = parseId(id)

            if (
                (!query && extname(path) === '.vue' && !/^import { render as _sfc_render } from ".*"$/m.test(code)) ||
                    (query && 'vue' in query && (query.type === 'template' || (query.type === 'script' && query.setup === 'true')))
                ){
                    const { code: imports, source } = generateImports(code, options)

                    return {
                        code: imports + source,
                        map: null,
                    }
            }

            return null
        }
    }
}

export default importPlugin
