class KeyExtractor {
  constructor() {}

  extractEmissionFactorProperties(object) {
    return {
      name_id: object.id,
      name: object.name,
      category: object.category,
      sector: object.sector,
      source: object.source,
      region: object.region,
      year: object.year,
      region_name: object.region_name,
      unit_type: object.unit_type[0],
      unit: object.unit,
      factor_calculation_method: object.factor_calculation_method,
      factor: object.factor,
      constituent_gases: object.constituent_gases,
    };
  }

  extractCalculationProperties(object) {
    return {
      category: object.emission_factor.category,
      emission_factor: object.emission_factor.id,
      source: object.emission_factor.source,
      co2: object.constituent_gases.co2,
      ch4: object.constituent_gases.ch4,
      n2o: object.constituent_gases.n2o,
      co2e: object.co2e,
      co2e_unit: object.co2e_unit,
      co2e_calculation_method: object.co2e_calculation_method,
    };
  }
}

module.exports = KeyExtractor;
