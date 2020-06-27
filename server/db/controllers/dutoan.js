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
                    let: { mh: "$MHDM", dm: "$DM" },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr:
                                {
                                    $and: [
                                        { $eq: ["$MHDM", "$$mh"] },
                                        { $eq: ["$DM", "$$dm"] }
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
                                                    { $eq: ["$DM", "$$dm"] }
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
                        { $sort: { MSVT: 1 }},
                        {
                            $project: {
                                MSVT: 1,
                                TVT: "$TTVT.TVT",
                                DVT: "$TTVT.DVT",
                                HPVT: 1,
                                LDM: { $substr: [ "$MSVT", 0, 1 ] }
                            }
                        }
                    ],
                    as: 'dinhmuc'
                }
            }
        ])
            .exec((err, res) => fn(err, res))
    }
}