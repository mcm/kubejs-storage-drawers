if (Platform.isLoaded('storagedrawers')) {
    ClientEvents.lang('en_us', (event) => {
        global.drawerTypes.forEach((drawerType) => {
            [1, 2, 4].forEach((drawerCount) => {
                [true, false].forEach((halfDepth) => {
                    let drawer_id = drawerType['id'] + '_' + (halfDepth ? 'half' : 'full') + '_drawers_' + drawerCount

                    // Bamboo Drawers 1x1
                    event.add('block.storagedrawers.' + drawer_id, drawerType['name'] + (halfDepth ? ' Half' : '') + ' Drawers 1x' + drawerCount)
                })
            })

            let trim_id = drawerType['id'] + '_trim'
            event.add('block.storagedrawers.' + drawer_id, drawerType['name'] + ' Trim')
        })
    })

    ClientEvents.highPriorityAssets((event) => {
        global.drawerTypes.forEach((drawerType) => {
            [1, 2, 4].forEach((drawerCount) => {
                [true, false].forEach((halfDepth) => {
                    let drawer_id = drawerType['id'] + '_' + (halfDepth ? 'half' : 'full') + '_drawers_' + drawerCount

                    event.addBlockState('storagedrawers:' + drawer_id, (gen) => {
                        gen.variant('facing=north', (variant) => {
                            variant
                                .model('storagedrawers:block/' + drawer_id)
                        })

                        gen.variant('facing=east', (variant) => {
                            variant
                                .model('storagedrawers:block/' + drawer_id)
                                .y(90)
                        })

                        gen.variant('facing=south', (variant) => {
                            variant
                                .model('storagedrawers:block/' + drawer_id)
                                .y(180)
                        })

                        gen.variant('facing=west', (variant) => {
                            variant
                                .model('storagedrawers:block/' + drawer_id)
                                .y(270)
                        })
                    })

                    event.addModel('block', 'storagedrawers:' + drawer_id, (gen) => {
                        gen.texture('front', 'storagedrawers:block/drawers_' + drawerType['id'] + '_front_' + drawerCount)
                        gen.texture('trim', 'storagedrawers:block/drawers_' + drawerType['id'] + '_trim')

                        if (halfDepth) {
                            gen.parent('storagedrawers:block/half_drawers_orientable')
                            gen.texture('back', 'storagedrawers:block/drawers_' + drawerType['id'] + '_side')
                            gen.texture('top', 'storagedrawers:block/drawers_' + drawerType['id'] + '_side_h')
                            gen.texture('side', 'storagedrawers:block/drawers_' + drawerType['id'] + '_side_v')
                        } else {
                            gen.parent('storagedrawers:block/full_drawers_orientable')
                            gen.texture('top', 'storagedrawers:block/drawers_' + drawerType['id'] + '_side')
                            gen.texture('side', 'storagedrawers:block/drawers_' + drawerType['id'] + '_side')
                        }
                    })

                    event.addModel('item', 'storagedrawers:' + drawer_id, (gen) => {
                        gen.parent('storagedrawers:block/' + drawer_id)
                    })
                })
            })

            let trim_id = drawerType['id'] + '_trim'

            event.addBlockState('storagedrawers:' + trim_id, (gen) => {
                gen.variant('', (variant) => {
                    variant
                        .model('storagedrawers:block/' + trim_id)
                })
            })

            event.addModel('block', 'storagedrawers:' + trim_id, (gen) => {
                gen.parent('block/cube_all')
                gen.texture('all', 'storagedrawers:block/drawers_' + drawerType['id'] + '_side')
            })

            event.addModel('item', 'storagedrawers:' + trim_id, (gen) => {
                gen.parent('storagedrawers:block/' + trim_id)
            })
        })
    })
}