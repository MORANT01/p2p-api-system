export interface ServiceMethod {
  name: string;
  description?: string;
  params?: Record<string, any>;
  returns?: any;
}

export interface Service {
  version: string;
  methods: string[] | ServiceMethod[];
  description?: string;
}
