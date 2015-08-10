package captiveportal::Controller::Signup;
use Moose;
use pf::survey;

BEGIN { extends 'captiveportal::PacketFence::Controller::Signup'; }

=head2 before index

Redirects to the oauth provider

=cut

before index => sub {
    my ($self, $c) = @_;
    my $request = $c->request;
    if($request->param("by_facebook")) {
        $c->detach(Oauth2 => 'auth_provider',[qw(facebook)]);
    } elsif($request->param("by_twitter")) {
        $c->detach(Oauth2 => 'auth_provider',[qw(twitter)]);
    }
};

=head2 before doNullSelfRegistration

Saving the survey_value into the session

=cut

before doNullSelfRegistration => sub {
    my ($self, $c) = @_;
    pf::survey::survey_save_request_into_session($c->session, $c->request);
};

=head1 NAME

captiveportal::Controller::Root - Root Controller for captiveportal

=head1 DESCRIPTION

[enter your description here]

=cut

=head1 AUTHOR

Inverse inc. <info@inverse.ca>

=head1 COPYRIGHT

Copyright (C) 2005-2015 Inverse inc.

=head1 LICENSE

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301,
USA.

=cut

__PACKAGE__->meta->make_immutable;

1;
