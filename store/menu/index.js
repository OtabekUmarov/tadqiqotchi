export const state = () => ({
    menu: {
        customer: [
            {
                title: "Bo‘limlar",
                list: [
                    {
                        id: 1,
                        title: "Tender yaratish",
                        icon: "icon-sidebar-file-plus",
                        url: "cabinetCustomerCreateTender",
                        path: '/cabinet/customer/create-tender'
                    },
                    {
                        id: 2,
                        title: "Yuborilgan arizalar",
                        icon: "icon-sidebar-message",
                        url: "cabinetCustomerApplications",
                        path: "/cabinet/customer/applications"
                    },
                    {
                        id: 3,
                        title: "Mening tenderlarim",
                        icon: "icon-sidebar-copy",
                        url: "cabinetCustomerTenders",
                        path: "/cabinet/customer/tenders"
                    },
                ],
            },
        ],
        admin: [
            {
                title: "Bo‘limlar",
                list: [
                    {
                        id: 1,
                        title: "Foydalanuvchilar",
                        icon: "icon-sidebar-file-plus",
                        path: '/cabinet/admin/users'
                    },
                    {
                        id: 3,
                        title: "Kuzatish",
                        icon: "icon-sidebar-graph",
                        path: "/cabinet/admin/log"
                    },
                ],
            },
        ],
        advisor: [
            {
                title: "Bo‘limlar",
                list: [
                    {
                        id: 1,
                        title: "Shahsiy kabinet",
                        icon: "icon-sidebar-file-plus",
                        path: '/cabinet/advisor/profile'
                    },
                    {
                        id: 1,
                        title: "Vazifa yuborish",
                        icon: "icon-sidebar-file-plus",
                        path: '/cabinet/advisor/task'
                    }
                ],
            },
        ],
        supervisor: [
            {
                title: "Bo‘limlar",
                list: [
                    {
                        id: 1,
                        title: "Shahsiy kabinet",
                        icon: "icon-sidebar-file-plus",
                        path: '/cabinet/supervisor/profile'
                    },
                    {
                        id: 3,
                        title: "Kuzatish",
                        icon: "icon-sidebar-graph",
                        path: "/cabinet/admin/log"
                    },
                ],
            },
        ],
        organizer: [
            {
                title: 'Bo‘limlar',
                list: [
                    {
                        id: 1,
                        title: "Rekvizitlar",
                        icon: "icon-sidebar-link",
                        url: "cabinetCustomerRequisites",
                        path: '/cabinet/organizer/requisites'
                    },
                    {
                        id: 2,
                        title: "Kelgan arizalar",
                        icon: "icon-sidebar-file-download",
                        url: "cabinetCustomerApplications",
                        path: '/cabinet/organizer/applications',
                        child: [
                            {
                                id: 1,
                                title: 'Budjet',
                                icon: 'icon-sidebar-budget',
                                url: 'cabinetOrganizerBudget',
                                path: '/cabinet/organizer/budget',
                            },
                            {
                                id: 2,
                                title: 'Korporativ',
                                icon: 'icon-sidebar-corporative',
                                url: 'cabinetOrganizerCorporative',
                                path: '/cabinet/organizer/corporative',
                            }
                        ]
                    },
                    {
                        id: 3,
                        title: "Mening tenderlarim",
                        icon: "icon-sidebar-copy",
                        url: "cabinetCustomerTenders",
                        path: '/cabinet/organizer/tenders'
                    },

                ]
            }
        ],
        participant: [
            {
                title: "Bo'limlar",
                list: [
                    {
                        id: 1,
                        title: "Analitika",
                        icon: "icon-sidebar-home",
                        url: "cabinetParticipantAnalytics",
                        path: '/cabinet/participant/analytics'
                    },
                    {
                        id: 2,
                        title: 'Rekvizitlar',
                        icon: "icon-sidebar-link",
                        url: "cabinetParticipantRequisites",
                        path: "/cabinet/participant/requisites"
                    },
                    {
                        id: 3,
                        title: 'Mening reytingim',
                        icon: "icon-sidebar-graph",
                        url: "cabinetParticipantRating",
                        path: "/cabinet/participant/rating"
                    },
                    {
                        id: 4,
                        title: 'To‘lovlar',
                        icon: "icon-sidebar-payment",
                        url: "cabinetParticipantPayment",
                        path: "/cabinet/participant/payment"
                    },
                    {
                        id: 5,
                        title: 'Mening tenderlarim',
                        icon: "icon-sidebar-copy",
                        url: "cabinetParticipantTenders",
                        path: "/cabinet/participant/tenders"
                    }
                ],

            },
            {
                title: "Toifalar",
                list: [
                    {
                        id: 1,
                        title: "Barcha",
                        icon: "icon-sidebar-all",
                        url: "cabinetParticipantAll",
                        path: '/cabinet/participant/all'
                    }
                ]
            },
            {
                title: "Belgilar",
                list: [
                    {
                        id: 1,
                        title: "Qiziqarli",
                        icon: "icon-sidebar-bookmark",
                        url: "cabinetParticipantInteresting",
                        path: '/cabinet/participant/interesting'
                    },
                    {
                        id: 2,
                        title: "Natija chiqqan",
                        icon: "icon-sidebar-bookmark",
                        url: "cabinetParticipantResult",
                        path: '/cabinet/participant/result'
                    },

                ]
            }
        ],
        moderator: [
            {
                title: 'Bo‘limlar',
                list: [
                    {
                        id: 1,
                        title: "Kelib tushgan lotlar",
                        icon: "icon-sidebar-file-download",
                        url: "cabinetModeratorLots",
                        path: '/cabinet/moderator/lots'
                    },
                    {
                        id: 2,
                        title: "Tenderlar",
                        icon: "icon-sidebar-copy",
                        url: "cabinetModeratorTenders",
                        path: '/cabinet/moderator/tenders'
                    },
                    {
                        id: 3,
                        title: 'To‘lovlar',
                        icon: "icon-sidebar-payment",
                        url: "cabinetParticipantPayment",
                        path: "/cabinet/moderator/payment"
                    },
                    {
                        id: 4,
                        title: "Ishtirokchilar reytingi",
                        icon: "icon-sidebar-graph",
                        url: "cabinetModeratorRating",
                        path: '/cabinet/moderator/rating'
                    },
                    {
                        id: 5,
                        title: "Katalog",
                        icon: "icon-sidebar-all",
                        url: "cabinetModeratorHolidays",
                        path: '/cabinet/moderator/holidays',
                        child: [
                            {
                                id: 1,
                                title: 'Bayram kunlari',
                                icon: 'icon-calendar',
                                url: 'cabinetModeratorCatalogHolidays',
                                path: '/cabinet/moderator/catalog/holidays',
                            },
                            {
                                id: 2,
                                title: 'Eng kam ish haqi',
                                icon: 'icon-sidebar-budget',
                                url: 'cabinetModeratorCatalogSalary',
                                path: '/cabinet/moderator/catalog/salary',
                            },
                        ]
                    },
                ]
            }
        ],
        minfinmoderator: [
            {
                title: 'Bo‘limlar',
                list: [
                    {
                        id: 1,
                        title: "Kelib tushgan arizalar",
                        icon: "icon-sidebar-file-download",
                        url: "cabinetMinFinModeratorApplications",
                        path: '/cabinet/minfin-moderator/applications'
                    },
                    {
                        id: 2,
                        title: "Tenderlar",
                        icon: "icon-sidebar-copy",
                        url: "cabinetMinFinModeratorTenders",
                        path: '/cabinet/minfin-moderator/tenders'
                    },
                ]
            }
        ]
    }
})
export const getters = {
    menu(state) {
       
        return state.menu
    }
}