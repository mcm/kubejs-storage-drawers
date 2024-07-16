const drawerShapes = {
    1: [
        '///',
        ' X ',
        '///'
    ],
    2: [
        '/X/',
        '///',
        '/X/'
    ],
    4: [
        'X/X',
        '///',
        'X/X'
    ],
}

if (Platform.isLoaded('storagedrawers')) {
    ServerEvents.recipes((event) => {
        global.drawerTypes.forEach((drawerType) => {
            let slab_item = null

            if ('slab' in drawerType) {
                slab_item = drawerType['slab']
            } else {
                slab_item = drawerType['planks'].replace('planks', 'slab')
            }

            [1, 2, 4].forEach((drawerCount) => {
                let depthTypes = null

                if (Item.exists(slab_item)) {
                    depthTypes = [true, false]
                } else {
                    depthTypes = [false]
                }

                depthTypes.forEach((halfDepth) => {
                    let drawer_id = 'storagedrawers:' + drawerType['id'] + '_' + (halfDepth ? 'half' : 'full') + '_drawers_' + drawerCount
                    event
                        .shaped(
                            Item.of(drawer_id, 1),
                            drawerShapes[drawerCount],
                            {
                                '/': { 'item': halfDepth ? slab_item : drawerType['planks'] },
                                'X': { 'tag': "forge:chests/wooden" }
                            }
                        )
                        .id(drawer_id)
                })
            })

            let trim_id = 'storagedrawers:' + drawerType['id'] + '_trim'

            event
                .shaped(
                    Item.of(trim_id, 4),
                    [
                        'X/X',
                        '/X/',
                        'X/X'
                    ],
                    {
                        '/': { 'tag': 'forge:rods/wooden' },
                        'X': { 'item': drawerType['planks'] }
                    }
                )
                .id(trim_id)
        })
    })
}