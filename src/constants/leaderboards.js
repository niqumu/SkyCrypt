const default = {
    mappedBy: 'uuid',
    sortedBy: -1
};

const overrides = {
    bank: {
        mappedBy: 'profile_id'
    },

    unique_minions: {
        mappedBy: 'profile_id'
    },

    end_race_best_time: {
        sortedBy: 1
    },

    foraging_race_best_time: {
        sortedBy: 1,
    },

    chicken_race_best_time: {
        sortedBy: 1
    },

    chicken_race_best_time_2: {
        sortedBy: 1
    }
};

const helper = require('./../helper');
const collections = require('./collections');

module.exports = {
    leaderboard: name => {
        const lbName = name.split("_").slice(1).join("_");

        const options = Object.assign({}, default);

        options['name'] = helper.titleCase(lbName);

        if(overrides.hasOwnProperty(lbName))
            for(const key in overrides[lbName])
                options[key] = overrides[key];

        if(lbName.startsWith('collection_')){
            const collectionName = lbName.split("_").slice(1).join("_").toUpperCase();
            const collectionData = collections.collection_data.filter(a => a.skyblockId == collectionName);

            if(collectionData.length > 0)
                options['name'] = collectionData[0].name;
        }

        return options;
    }
}
