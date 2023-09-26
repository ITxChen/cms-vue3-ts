export interface Geodatav {
  type: string
  features: Feature[]
}

export interface Feature {
  type: FeatureType
  properties: Properties
  geometry: Geometry
}

export interface Geometry {
  type: GeometryType
  coordinates: Array<Array<Array<number[] | number>>>
}

export enum GeometryType {
  MultiPolygon = 'MultiPolygon',
  Polygon = 'Polygon'
}

export interface Properties {
  adcode: number | string
  name: string
  center?: number[]
  centroid?: number[]
  childrenNum?: number
  level?: Level
  parent?: Parent
  subFeatureIndex?: number
  acroutes?: number[]
  adchar?: string
}

export enum Level {
  Province = 'province'
}

export interface Parent {
  adcode: number
}

export enum FeatureType {
  Feature = 'Feature'
}

// 城市属性
export interface citymodel {
  name: string
  adcode: number | string
  url: string
  childrenNum: number | undefined
  center?: number[]
  parentadcode?: number | string // 父地图
  hasRegister: boolean // 是否已经注册在echarts
}
