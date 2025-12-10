/**
 * Faridganj Upazila Data
 * Source: info_faridganj.pdf
 */

const faridganjData = {
    basicInfo: {
        upazilaName: "ফরিদগঞ্জ",
        district: "চাঁদপুর",
        areaAcres: "৫৭২২০.৬০ একর",
        areaSqKm: "২৩১.৫৬ বর্গ কি.মি.",
        landArea: "২২৪.৬০ বর্গ কি.মি.",
        riverArea: "৬.৯৬ বর্গ কি.মি.",
        municipalityCount: "১ টি",
        unionCount: "১৫ টি",
        mouzaCount: "১৭৭ টি",
        villageCount: "১৮০ টি"
    },
    demographics: {
        totalPopulation: "৪৩৩২৪৪ জন (২০২২ আদমশুমারী)",
        male: "১৯৮৮৩৬ জন",
        female: "২৩৪৪০৮৪ জন",
        density: "১৭১৩ জন/বর্গ কি.মি.",
        totalVoters: "২৯৫৬৩২ জন",
        maleVoters: "১৪৯৯৩০ জন",
        femaleVoters: "১৪৫৭০২ জন",
        constituency: "২৬৩ (চাঁদপুর-৬)",
        totalHouseholds: "৮৫৬৭৮ টি",
        literacyRate: {
            average: "৫৮.১%",
            male: "৫৬.৬%",
            female: "৫৯.৩%"
        }
    },
    socialWelfare: {
        freedomFighters: "৬৯৪ জন",
        disabledPopulation: "১৮৯৮ জন",
        allowances: {
            disabled: "১৮৯৮ জন",
            disabledEducationStipend: "১২৭ জন",
            freedomFighterHonorarium: "৬৯৪ জন",
            oldAge: "১০১৪৬ জন",
            widowAndDestitute: "২৯৪২ জন",
            transgenderEducationStipend: "২ জন",
            acidSurvivorsAndDisabled: "১৭৫ জন"
        },
        registeredVoluntaryOrgs: "৮৭ টি",
        patientWelfareSocieties: "২৩৬ জন",
        disabilitySurveyCount: "৩০১০ জন"
    },
    agriculture: {
        totalLand: "৫৭২২০.৬০ একর",
        cultivableLand: "৩১৮৭৯ একর",
        fallowLandTypes: {
            singleCrop: "৫১২৫ একর",
            doubleCrop: "২৩৬৯৩ একর",
            tripleCrop: "৩০৫০ একর"
        },
        permanentOrchards: "৯৫৩৬ একর",
        irrigatedLand: "২৬৮৪৮ একর",
        equipment: {
            deepTubewells: "০১ টি",
            shallowTubewells: "৪ টি",
            powerPumps: "৮৩৮ টি"
        },
        farmerFamilies: {
            landless: "৮৪৪৫ টি",
            totalFarmHouseholds: "৫২২৯৪ টি",
            ownerFarmers: "৩৬৫৩০ টি",
            ownerSharecroppers: "১৩৯০৮ টি",
            sharecroppers: "১৮৫৬ টি"
        },
        dealers: {
            bcicFertilizer: "১৫ জন"
        },
        agriBlocks: "৪৪ টি"
    },
    education: {
        primary: {
            govt: "১৮৯ টি",
            unregistered: "০১ টি",
            kindergarten: "৮১ টি"
        },
        secondary: {
            highSchools: "৪৬ টি",
            juniorHighSchools: "০৪ টি"
        },
        college: {
            total: "০৮ টি",
            higherSecondary: "০৬ টি (কারিগরি ০২ টি)",
            degree: "০২ টি"
        },
        madrasa: {
            dakhil: "২৬ টি",
            alim: "১২ টি",
            fazil: "১৩ টি",
            kamil: "০১ টি",
            qawmi: "১০ টি",
            ebtedayi: "৫২ টি",
            nurani: "২৫ টি",
            hafiziya: "৩০ টি",
            forkaniya: "৭০ টি",
            kindergartenMadrasa: "১০ টি"
        },
        technicalInstitutes: "০২ টি"
    },
    health: {
        facilities: {
            upazilaHealthComplex: "০১ টি",
            familyWelfareCenters: "০৮ টি",
            subHealthCenters: "০৬ টি",
            maternityCenters: "০১ টি",
            communityClinics: "৩৭ টি",
            privateHospitals: "০২ টি",
            diagnosticCenters: "১০ টি"
        }
    },
    fisheries: {
        waterBodies: {
            totalPonds: "১০৯১০ টি",
            govtPonds: "৪৫ টি (৪৬.৩১ একর)",
            fisheriesDeptPonds: "০৩ টি (০.৯৫ একর)",
            privatePonds: "১০৮৫৪ টি (৪১৯০.৫৯ একর)"
        },
        hatcheries: {
            fryProduction: "০৬ টি"
        },
        production: "৬৯১৭.৯৫ মে.টন"
    },
    infrastructure: {
        roads: {
            paved: "২৬৩ কি.মি.",
            semiPaved: "০৩ কি.মি.",
            mud: "৮২২ কি.মি."
        },
        structures: {
            bridges: "১৪৩ টি",
            culverts: "৬৩৬ টি",
            baileyBridges: "১ টি",
            poles: "২১ টি",
            bambooBridges: "৭৯ টি"
        },
        communication: {
            postOffices: "৩৪ টি",
            telephoneExchange: "১ টি",
            railway: "নাই"
        }
    },
    waterAndSanitation: {
        tubewells: {
            total: "২৮৬৬২ টি",
            functionalDeep: "৫২৭ টি",
            nonFunctional: "১২৭ টি"
        },
        sanitation: {
            coverage: "৯৫%",
            hygienicHouseholds: "৮১৩৯৪ টি",
            unhygienicHouseholds: "৪২৮৪ টি"
        }
    },
    forestryAndFood: {
        foodWarehouses: "০২ টি",
        forests: {
            private: "৭১০০ একর",
            govt: "নাই"
        },
        nurseries: {
            govt: "০১ টি",
            private: "৩৮ টি"
        }
    },
    security: {
        vdp: {
            total: "৯২৮০ জন",
            male: "৪৬৪০ জন",
            female: "৪৬৪০ জন"
        },
        ansar: {
            total: "৬১২ জন"
        }
    },
    cooperatives: {
        associations: {
            fishermen: "৩০ টি",
            women: "০১ টি",
            freedomFighters: "০২ টি",
            youth: "০২ টি",
            savingsAndLoan: "৮৮ টি",
            multipurpose: "১১৩ টি",
            dairy: "০১ টি",
            unionCooperative: "১৫ টি"
        },
        brdb: {
            farmers: "২২০ টি",
            women: "০৯ টি",
            members: "১৩৪৬৩ জন",
            beneficiaries: "১২৪২০ টি",
            loanDistributed: "৪৫.৭৫ কোটি"
        }
    },
    heritage: [
        "সাহেবগঞ্জ নীল কুটি",
        "লোহাগড় মঠ",
        "রুপসা জমিদার বাড়ি",
        "কড়ৈতলী গোবিন্দ বসুর বাড়ি"
    ],
    miscellaneous: {
        cinemaHalls: "নাই",
        markets: "৪১ টি",
        banks: "১৩ টি",
        mosques: "৮৮৩ টি",
        eidgahs: "২৫৮ টি",
        temples: "১১ টি",
        churches: "০১ টি",
        orphanages: "১৩ টি",
        landOffices: "১২ টি",
        restHouses: "০২ টি",
        sawMills: "৮১ টি",
        ngos: "১৬ টি",
        clusterVillages: "০১ টি (কাছিয়াড়া, ৫ একর, ৮০টি পরিবার)"
    },
    livestock: {
        cows: "৯৬৬১৭ টি",
        goats: "১৮২৮৮ টি",
        ducks: "১৩১৪৬৫ টি",
        chickens: "১৪৪০৪৩৩ টি",
        sheep: "৭৯১ টি",
        farms: {
            cow: "৬০ টি",
            goat: "০১ টি",
            poultry: "৮৮৫ টি"
        }
    },
    municipality: {
        name: "ফরিদগঞ্জ পৌরসভা",
        established: "০১-০৯-২০০৫ ইং",
        class: "ক",
        area: "১৮.৫৪ বর্গ কি: মি:",
        population: {
            total: "৩৫০৯০ জন",
            male: "১৬৬২৬ জন",
            female: "১৮৪৬৪ জন"
        },
        literacyRate: "৫৮.১%",
        wards: "০৯ টি",
        mahallas: "২২ টি",
        institutions: {
            govtPrimary: "৪ টি",
            kindergarten: "০৬ টি",
            govtHighSchool: "০১ টি",
            privateHighSchool: "০৩ টি",
            privateCollege: "০১ টি",
            aliaMadrasa: "০১ টি",
            alimMadrasa: "০১ টি",
            govtHospital: "০১ টি"
        }
    },
    postalCodes: [
        {
            code: "3650",
            office: "ফরিদগঞ্জ উপজেলা (পিও)",
            areas: ["কালির বাজার", "কাওনিয়া", "সাহেবগঞ্জ", "পূর্ব এখলাস পুর", "সোনালী বালিকা হাই স্কুল"]
        },
        {
            code: "3651",
            office: "চান্দ্রা (এসও)",
            areas: ["কড়ৈতলী", "বালিথুবা", "দক্ষিণ বালিথুবা", "পাইকপাড়া", "পূর্ব গাজীপুর"]
        },
        {
            code: "3652",
            office: "রূপসা (এসও)",
            areas: ["গুপট্রী", "দায়চারা", "লাউতলী", "সিংগেরগাঁও", "রুস্তমপুর", "গেল ভান্ডার শরীফ"]
        },
        {
            code: "3653",
            office: "গৃদকালিন্দিয়া (ইডিএসও)",
            areas: []
        },
        {
            code: "3654",
            office: "রামপুর বাজার (ইডিএসও)",
            areas: []
        },
        {
            code: "3655",
            office: "ইসলামপুর শাহ্ ইয়াসিন মাদ্রাসা (এসও)",
            areas: ["মূল পাড়া"]
        },
        {
            code: "3600",
            office: "নয়াহাট (পিও)",
            areas: ["ধানুয়া", "মনতলা", "ঘনিয়া"]
        },
        {
            code: "3611",
            office: "টোরা মুন্সির হাট (পিও)",
            areas: ["শোল্লা", "সুবিদপুর", "গল্লাক", "বাসারা", "কামতা"]
        }
    ]
};

// End of data