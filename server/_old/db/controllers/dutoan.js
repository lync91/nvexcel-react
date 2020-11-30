var mongoose = require('mongoose');
const { fn } = require('..');
var DinhMuc = mongoose.model('dinhmuc')
var DonGia = mongoose.model('dongia')

module.exports = {
    get: (dm, fn) => {
        DonGia.aggregate([
            { $match: { MHDG: dm } },
            {
                $lookup: {
                    from: 'dinhmucs',
                    let: { mh: "$MHDM", dm: "$DM", kv: "$KV" },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $and: [
                                        { $eq: ["$MHDM", "$$mh"] },
                                        { $eq: ["$DM", "$$dm"] },
                                        { $eq: ["$KV", "$$kv"] }
                                    ]
                                }
                            }
                        },
                        {
                            $lookup: {
                                from: 'tudienvattus',
                                let: { msvt: "$MSVT", dm: "$DM" },
                                pipeline: [
                                    {
                                        $match:
                                        {
                                            $expr:
                                            {
                                                $and: [
                                                    { $eq: ["$MSVT", "$$msvt"] },
                                                    { $eq: ["$DM", "$$dm"] },
                                                    { $eq: ["$KV", "$$kv"] }
                                                ]
                                            }
                                        }
                                    },

                                ],
                                as: 'TTVT'
                            }
                        },
                        { $unwind: { path: "$TTVT", preserveNullAndEmptyArrays: true } },
                        // {
                        //     $addFields: {
                        //         LDM: { $substr: ["$MSVT", 0, 1] }
                        //     }
                        // },
                        // {
                        //     $group: {
                        //         _id: "$LDM",
                        //         DM: { $push: "$$ROOT" }
                        //     }
                        // }
                        { $sort: { MSVT: 1 } },
                        {
                            $project: {
                                MSVT: 1,
                                TVT: "$TTVT.TVT",
                                DVT: "$TTVT.DVT",
                                HPVT: 1,
                                LDM: { $substr: ["$MSVT", 0, 1] }
                            }
                        }
                    ],
                    as: 'dinhmuc'
                }
            }
        ])
            .exec((err, res) => fn(err, res))
    },
    search: (kv, dm, text, fn) => {
        var txt = `"${text.replace(/\s/g, "\" \"")}"`
        // var _txt = `"${txt.replace(/\s/g, "\" \"")}"`
        // console.log(_txt);
        // console.log("\"bê\" \"tông\" \"móng\"");
        console.log(kv);
        console.log(dm);
        var _dm = dm.map(e => {
            return {DM: e}
        })
        console.log(dm[0]);
        
        DonGia
        .aggregate()
        // .find({
        //     DM: {$in: dm},
        //     KV: kv,
        //     // $text: { $search:  txt }
        // })
        // .aggregate([
        //     // {
        //     //     $addFields: { arrTCV: { $split: ['$TCV', '\s']}}
        //     // },
        //     // { $match: { KV: kv } },
        //     // { $match: {DM: {$in: dm}} },
        //     {
        //         $match: {
        //             KV: kv,
        //             $text: { $search:  txt },
        //         }
        //     },
        //     // { $match: {DM: {$in: dm}} },
        //     // { $match: { KV: kv } },
        // ])
        // .match({DM: {$in: dm}})
        // .match({
        //     // DM: {$in: dm},
        //     // KV: kv,
        //     $text: { $search:  txt }
        // })
        // .match({
        //     $text: { $search:  txt },
        // })
        // .project({MHDG:1, TCV: 1, DVT: 1, KV: 1, DM: 1})
        .match({$text: { $search:  txt }})
        .match({
            $and: [
                {DM: {$in: dm}},
                
            ]
        })
        .limit(50)
        .exec((err, res) => {
            console.log(err);
            
            fn(err, res)
        })
    },
    getkv: (fn) => {
        DonGia.aggregate([
            { $group: { _id: "$KV" } },
            {
                $project: {
                    _id: -1,
                    value: '$_id',
                    label: '$_id'
                }
            }
        ]).exec((err, res) => fn(err, res))
    },
    getdm: (kv, fn) => {
        DonGia.aggregate([
            { $match: { KV: kv } },
            { $group: { _id: "$DM" } },
            {
                $project: {
                    _id: -1,
                    value: '$_id',
                    label: '$_id'
                }
            }
        ])
            .exec((err, res) => fn(err, res))
    }
}