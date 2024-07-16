const $BlockItem = Java.loadClass('net.minecraft.world.item.BlockItem')
const $BlockStandardDrawers = Java.loadClass('com.jaquadro.minecraft.storagedrawers.block.BlockStandardDrawers')
const $BlockTrim = Java.loadClass('com.jaquadro.minecraft.storagedrawers.block.BlockTrim')
const $IProperties = Java.loadClass('net.minecraft.world.item.Item$Properties')
const $ItemDrawers = Java.loadClass('com.jaquadro.minecraft.storagedrawers.item.ItemDrawers')
const $Properties = Java.loadClass('net.minecraft.world.level.block.state.BlockBehaviour$Properties')

global.drawerTypes = [
    { 'id': 'bamboo', 'name': 'Bamboo', 'planks': 'minecraft:bamboo_planks' },
    { 'id': 'cherry', 'name': 'Cherry', 'planks': 'minecraft:cherry_planks' },
    { 'id': 'mangrove', 'name': 'Mangrove', 'planks': 'minecraft:mangrove_planks' }
]

if (Platform.isLoaded('biomesoplenty')) {
    [
        { 'id': 'dead', 'name': 'Dead', 'planks': 'biomesoplenty:dead_planks' },
        { 'id': 'fir', 'name': 'Fir', 'planks': 'biomesoplenty:fir_planks' },
        { 'id': 'hellbark', 'name': 'Hellbark', 'planks': 'biomesoplenty:hellbark_planks' },
        { 'id': 'jacaranda', 'name': 'Jacaranda', 'planks': 'biomesoplenty:jacaranda_planks' },
        { 'id': 'magic', 'name': 'Magic', 'planks': 'biomesoplenty:magic_planks' },
        { 'id': 'mahogany', 'name': 'Mahogany', 'planks': 'biomesoplenty:mahogany_planks' },
        { 'id': 'palm', 'name': 'Palm', 'planks': 'biomesoplenty:palm_planks' },
        { 'id': 'redwood', 'name': 'Redwood', 'planks': 'biomesoplenty:redwood_planks' },
        { 'id': 'umbran', 'name': 'Umbran', 'planks': 'biomesoplenty:umbran_planks' },
        { 'id': 'willow', 'name': 'Willow', 'planks': 'biomesoplenty:willow_planks' }
    ].forEach((drawerType) => global.drawerTypes.push(drawerType))
}

if (Platform.isLoaded('create_dd')) {
    [
        { 'id': 'rose', 'name': 'Rose', 'planks': 'create_dd:rose_planks' },
        { 'id': 'rubber', 'name': 'Rubber', 'planks': 'create_dd:rubber_planks' },
        { 'id': 'smoked', 'name': 'Smoked', 'planks': 'create_dd:smoked_planks' },
        { 'id': 'spirit', 'name': 'Spirit', 'planks': 'create_dd:spirit_planks' }
    ].forEach((drawerType) => global.drawerTypes.push(drawerType))
}

if (Platform.isLoaded('ribbits')) {
    [
        { 'id': 'mossy_oak', 'name': 'Mossy Oak', 'planks': 'ribbits:mossy_oak_planks' }
    ].forEach((drawerType) => global.drawerTypes.push(drawerType))
}

if (Platform.isLoaded('twilightforest')) {
    [
        { 'id': 'canopy', 'name': 'Canopy', 'planks': 'twilightforest:canopy_planks' },
        { 'id': 'darkwood', 'name': 'Darkwood', 'planks': 'twilightforest:darkwood_planks' },
        { 'id': 'minewood', 'name': 'Minewood', 'planks': 'twilightforest:minewood_planks' },
        { 'id': 'sortingwood', 'name': 'Sortingwood', 'planks': 'twilightforest:sortingwood_planks' },
        { 'id': 'timewood', 'name': 'Timewood', 'planks': 'twilightforest:timewood_planks' },
        { 'id': 'transwood', 'name': 'Transwood', 'planks': 'twilightforest:transwood_planks' },
        { 'id': 'twilight_mangrove', 'name': 'Twilight Mangrove', 'planks': 'twilightforest:mangrove_planks' },
        { 'id': 'twilight_oak', 'name': 'Twilight Oak', 'planks': 'twilightforest:twilight_oak_planks' }
    ].forEach((drawerType) => global.drawerTypes.push(drawerType))
}

let drawerBlocks = {}

if (Platform.isLoaded('storagedrawers')) {
    StartupEvents.registry('block', event => {
        var props = $Properties.of()
            .sound(SoundType.WOOD)
            .strength(3, 4)

        global.drawerTypes.forEach((drawerType) => {
            [1, 2, 4].forEach((drawerCount) => {
                [true, false].forEach((halfDepth) => {
                    let id = drawerType['id'] + '_' + (halfDepth ? 'half' : 'full') + '_drawers_' + drawerCount

                    drawerBlocks[id] = event
                        .createCustom('storagedrawers:' + id, () => new $BlockStandardDrawers(drawerCount, halfDepth, props))
                        .tag('storagedrawers:drawers')
                })
            })

            let id = drawerType['id'] + '_trim'
            drawerBlocks[id] = event
                .createCustom('storagedrawers:' + id, () => new $BlockTrim(props))
        })
    })

    StartupEvents.registry('item', event => {
        global.drawerTypes.forEach((wood) => {
            [1, 2, 4].forEach((drawerCount) => {
                [true, false].forEach((halfDepth) => {
                    let id = wood['name'] + '_' + (halfDepth ? 'half' : 'full') + '_drawers_' + drawerCount

                    event
                        .createCustom('storagedrawers:' + id, () => new $ItemDrawers(drawerBlocks[id].get(), new $IProperties()))
                        .tag('storagedrawers:drawers')
                })
            })

            let id = wood['name'] + '_trim'
            event
                .createCustom('storagedrawers:' + id, () => new $BlockItem(drawerBlocks[id].get(), new $IProperties()))
        })
    })
}