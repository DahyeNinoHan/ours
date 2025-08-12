-- Create secrets table for storing API keys
CREATE TABLE public.secrets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.secrets ENABLE ROW LEVEL SECURITY;

-- Create policies - secrets should only be accessible by service role, not users
CREATE POLICY "Service role can manage secrets" 
ON public.secrets 
FOR ALL 
USING (auth.role() = 'service_role');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_secrets_updated_at
BEFORE UPDATE ON public.secrets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();