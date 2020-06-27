var mongoose = require('mongoose');
const { fn } = require('..');
var DinhMuc = mongoose.model('dinhmuc')
var DonGia = mongoose.model('dongia')

module.exports = {
    get: (dm, fn) => {
        DonGia.aggregate([
            {$match: {MHDG: dm}},
            {$lookup: { 
                from: 'dinhmucs', 
                let: { mh: "$MHDM", dm: "$DM"}, 
                pipeline: [
                    { $match:
                       { $expr:
                        {$and: [
                            { $eq: [ "$MHDM",  "$$mh" ] },
                            { $eq: [ "$DM",  "$$dm" ] }
                        ]}
                       }
                    },
                    {$lookup: { 
                        from: 'tudienvattus',
                        let: { msvt: "$MSVT", dm: "$DM" },
                        pipeline: [
                            { $match:
                                { $expr:
                                 {$and: [
                                     { $eq: [ "$MSVT",  "$$msvt" ] },
                                     { $eq: [ "$DM",  "$$dm" ] }
                                 ]}
                                }
                             },
                             {$lookup: { 
                                from: 'giacamays',
                                let: { msvt: "$MSVT", dm: "$DM" },
                                pipeline: [
                                    { $match:
                                        { $expr:
                                         {$and: [
                                             { $eq: [ "$MH",  "$$msvt" ] },
                                             { $eq: [ "$DM",  "$$dm" ] }
                                         ]}
                                        }
                                     },
                                ],
                                as: 'camay' 
                            }}
                        ],
                        as: 'TTVT' 
                    }}
                 ],
                as: 'dinhmuc' }}
        ])
        .exec((err, res) => fn(err, res))
    }
}