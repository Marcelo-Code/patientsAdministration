import {
    createClient
} from '@supabase/supabase-js';

export const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL


// Coloca tu URL y clave de Supabase
const supabaseUrl = 'https://aidomabsbykwegmcqukz.supabase.co'; // Sustituye con tu URL de Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpZG9tYWJzYnlrd2VnbWNxdWt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI3MTcwNjQsImV4cCI6MjA0ODI5MzA2NH0.86Fb6gnFn2AQwaCcLn9ptXN5MKbj4jp7vPU2_rJcro4'; // Sustituye con tu clave pública de Supabase

// Crear y exportar el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
export const bucketName = 'ImagesPatientAdministration';
export const publicBucketUrl = 'https://aidomabsbykwegmcqukz.supabase.co/storage/v1/object/public/ImagesPatientAdministration/';


export const publicbucketCudBillingtUrl = 'https://aidomabsbykwegmcqukz.supabase.co/storage/v1/object/public/CudBillingDocumentsPatientsAdministrations/';
export const bucketCudBillingName = 'CudBillingDocumentsPatientsAdministrations';